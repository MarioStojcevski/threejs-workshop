import * as THREE from 'three'
import { SpotLight } from 'three';
import { Vector3 } from 'three';

export default class Lamp extends THREE.Object3D {
    constructor() {
        super();

        this.init();
    }

    init() {
        this.initLamp();
        this.initLight();
    }

    initLamp() {
        this.container = new THREE.Group();
        this.add(this.container)
        const lamp = this.lamp = THREE.Cache.get('lamp').scene;
        lamp.position.set(0, 0, 0)
        const scale = 0.05;
        lamp.scale.set(scale, scale, scale);
        this.container.add(lamp);
    }
    initLight() {
        let spotlight = new THREE.SpotLight(0xffffff,);
        spotlight.castShadow = true;
        // spotlight.penumbra = 0.5
        // spotlight.decay = true;

        spotlight.shadow.mapSize.width = 1024;
        spotlight.shadow.mapSize.height = 1024;

        spotlight.shadow.camera.near = 500;
        spotlight.shadow.camera.far = 4000;
        spotlight.shadow.camera.fov = 30;


        spotlight.position.set(0, 0.7, -0.32);
        console.log(spotlight)

        this.container.add(spotlight);


    }
}