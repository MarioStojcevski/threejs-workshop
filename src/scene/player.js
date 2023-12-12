import * as THREE from 'three'
import * as TWEEN from '@tweenjs/tween.js';

import Person from './person';
export default class Player extends THREE.Object3D {
    constructor() {
        super();

        this.init();
    }

    init() {
        this.person = new Person("adventurer");
        this.add(this.person);
    }

    onMove() {

    }
    playAnimation(name) {
        this.person.playAnimation(name)
    }
    reverseAnimation(name) {
        this.person.reverseAnimation(name)
    }

    jump() {
        if (this.jumping) return;
        this.jumping = true;

        // new TWEEN.Tween(//what)
        //     .to({ y: //something }, 100)
        //     .yoyo(true)
        //     .repeat(1)
        //     .onUpdate(() => {
        //     })
        //     .onComplete(() => {
        //         this.jumping = false;
        //     })
        //     .start();
    }

    speak() {
        this.person.speak();
    }
}