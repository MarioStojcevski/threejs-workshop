import * as THREE from 'three';
import * as TWEEN from '@tweenjs/tween.js';
import ChatManager from '../kernel/chat-manager'
export default class Person extends THREE.Object3D {
    constructor(type) {
        super();
        this.characterType = type;
        this.person = null;
        this.personScale = 0.2;
        this.waiting = false;

        this.dialogueOption = ["Did you know that THREE.js simplifies rendering 3D graphics in the browser? It's incredible!",
            "I've been experimenting with shaders in THREE.js lately. The visual effects you can achieve are mind-blowing.",
            "Ah, the joy of working with meshes and geometry in THREE.js! It's like sculpting in a digital world.",
            "Have you tried implementing animations using the AnimationMixer in THREE.js? So much potential for dynamic movements!",
            "I love how you can create interactive experiences using raycasting in THREE.js. It's like giving life to objects.",
            "Working with textures and materials in THREE.js adds a whole new dimension to visual storytelling.",
            "Ever used post-processing effects in THREE.js? They take scenes to a whole new level of realism and immersion."
        ]

        if (this.characterType === 'adventurer') this.asset = THREE.Cache.get('adventurer');
        if (this.characterType === 'casual') this.asset = THREE.Cache.get('casual');

        this.chatManager = new ChatManager();

        this.init();
    }

    init() {
        this.person = this.asset.scene.children[0];
        this.person.scale.set(this.personScale, this.personScale, this.personScale);
        this.person.position.set(0, 0.05, 0);
        this.person.name = this.characterType;
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
    speak() {
        if (this.waiting) {
            console.log("Please wait. Generating new dialogue...");
            return;
        }

        this.waiting = true;

        let int = Math.floor(Math.random() * this.dialogueOption.length);
        let dialogueOption = this.dialogueOption[int];

        // Set a timeout to reset waiting after 2 seconds (adjust as needed)
        setTimeout(() => {
            this.waiting = false;
        }, 2000); // Adjust the time delay in milliseconds
        this.chatManager.speak(this.person, dialogueOption)
    }

}
