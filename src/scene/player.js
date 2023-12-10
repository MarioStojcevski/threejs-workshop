import * as THREE from 'three'
import * as TWEEN from '@tweenjs/tween.js';

import Person from './person';
export default class Player extends THREE.Object3D {
    constructor() {
        super();

        this.init();
    }

    init() {
        this.player = new Person("adventurer");
        this.add(this.player);
    }

    onMove() {

    }
    playAnimation(name) {
        this.player.playAnimation(name)
    }
    reverseAnimation(name) {
        this.player.reverseAnimation(name)
    }

    jump() {
        if (this.jumping) return;
        this.jumping = true;

        new TWEEN.Tween(this.player.position)
            .to({ y: this.player.position.y + 0.2 }, 100)
            .yoyo(true)
            .repeat(1)
            .onUpdate(() => {
            })
            .onComplete(() => {
                this.jumping = false;
            })
            .start();
    }
}