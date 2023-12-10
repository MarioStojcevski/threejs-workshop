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
        lamp.traverse((child) => {
            // console.log(child.name)
            if (child.name === "Node-Mesh_1") child.material = new THREE.MeshPhysicalMaterial({
                color: 0xffffff, transparent: true, opacity: 0.3

            })
        })
        const scale = 0.05;
        lamp.scale.set(scale, scale, scale);
        this.container.add(lamp);
    }
    initLight() {
        let spotlight = new THREE.SpotLight(0xFFBF00,);
        spotlight.castShadow = true;
        // spotlight.penumbra = 0.5
        // spotlight.decay = true;

        spotlight.shadow.mapSize.width = 1024;
        spotlight.shadow.mapSize.height = 1024;

        spotlight.shadow.camera.near = 500;
        spotlight.shadow.camera.far = 4000;
        spotlight.shadow.camera.fov = 30;


        spotlight.position.set(0, 1, -0.32);
        this.container.add(spotlight);
    }
}