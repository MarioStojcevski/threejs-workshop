import * as THREE from 'three';
import * as TWEEN from '@tweenjs/tween.js';

export default class Person extends THREE.Object3D {
    constructor(type) {
        super();
        this.characterType = type;
        this.person = null;
        this.personScale = 0.2;
        this.init();
    }

    init() {
        if (this.characterType === 'adventurer') this.asset = THREE.Cache.get('adventurer');
        this.person = this.asset.scene.children[0];
        this.person.scale.set(this.personScale, this.personScale, this.personScale);
        this.person.position.set(0, 0.05, 0);
        this.add(this.person);
        this.asset.animations.forEach(element => {
            // console.log(element.name)
        });
        this.playIdle();
    }

    playAnimation(name) {
        if (this.playing && !this.clip.name.includes("Idle")) return;

        else {
            this.playing = true;
            const clips = this.asset.animations;
            this.clip = THREE.AnimationClip.findByName(clips, name);

            if (!this.clip) {
                console.error(`Animation this.clip ${name} not found.`);
                return;
            }

            const mixer = new THREE.AnimationMixer(this.person);
            const action = mixer.clipAction(this.clip);
            action.play();

            const duration = this.clip.duration;
            let currentTime = { time: 0 };
            let yoyoVal;

            const tween = new TWEEN.Tween(currentTime)
                .to({ time: duration }, duration * 1000)
                .onUpdate(() => {
                    mixer.update(currentTime.time / 100);
                })
                .onComplete(() => {
                    mixer.stopAllAction();
                    this.playing = false;
                })
                .start();
        }
    }

    playIdle() {
        //this function plays always

        const clips = this.asset.animations;

        const name = 'CharacterArmature|Idle';
        const clip = THREE.AnimationClip.findByName(clips, name);

        const mixer = new THREE.AnimationMixer(this.person);
        const action = mixer.clipAction(clip);
        action.play();

        const duration = clip.duration;
        let currentTime = { time: 0 };

        this.idleTween = new TWEEN.Tween(currentTime)
            .to({ time: duration }, duration * 1000)
            .repeat(Infinity)
            .onUpdate(() => {
                mixer.update(currentTime.time / 100);
            })
            .onComplete(() => {
                mixer.stopAllAction();
                this.playing = false;
            })
            .start();

    }
    reverseAnimation(name) {
        if (this.playing && !this.clip.name.includes("Idle")) return;

        else {
            this.playing = true;
            const clips = this.asset.animations;
            this.clip = THREE.AnimationClip.findByName(clips, name);

            if (!this.clip) {
                console.error(`Animation this.clip ${name} not found.`);
                return;
            }

            const mixer = new THREE.AnimationMixer(this.person);
            const action = mixer.clipAction(this.clip);
            action.play();

            const duration = this.clip.duration;
            let currentTime = { time: duration };

            const tween = new TWEEN.Tween(currentTime)
                .to({ time: 0 }, duration * 1000)
                .onUpdate(() => {
                    mixer.setTime(currentTime.time);
                })
                .onComplete(() => {
                    mixer.stopAllAction();
                    this.playing = false;
                })
                .start();
        }
    }


}
