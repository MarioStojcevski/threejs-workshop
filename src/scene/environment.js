import * as THREE from 'three'
import Lamp from './lamp';
import Person from './person';
export default class Environment extends THREE.Object3D {
    constructor(scene, camera, renderer) {
        super();
        this.scene = scene;
        this.camera = camera;
        this.renderer = renderer;
        this.init();
    }

    init() {

        // this.initSkybox();
        this.initGround()
        this.initChristmasTree();
        this.initTrees();
        this.initHouses();
    }

    initSkybox() {

    }
    initGround() {
        const geometry = new THREE.CylinderGeometry(4, 4, 0.1);
        const material = new THREE.MeshPhysicalMaterial({ color: 0x666666 });
        this.floor = new THREE.Mesh(geometry, material);
        this.floor.position.set(0, 0, 0)
        this.floor.receiveShadow = true;
        this.scene.add(this.floor);


        const mountains = THREE.Cache.get('mountains').scene;
        mountains.position.set(0, 0, -2.4)
        mountains.scale.set(1, 1, 1)
        mountains.castShadow = true;
        mountains.receiveShadow = true;

        this.scene.add(mountains)

    }
    initTrees() {
        const treeGroupPositions = [
            { x: -1.5, z: -2 },
            { x: -1.7, z: -1.7 },
            { x: -1.5, z: -1.3 },
            { x: -1.2, z: -1.1 },
            { x: -2, z: 2 },
            { x: 2, z: -2 },
            { x: 2, z: 2 }
            // Add more positions as needed
        ];

        const treeGroupModel = THREE.Cache.get('pineTrees').scene;
        const scale = 1;

        for (let i = 0; i < treeGroupPositions.length; i++) {
            const treeGroup = treeGroupModel.clone();
            const position = treeGroupPositions[i];
            treeGroup.position.set(position.x, 0, position.z);
            treeGroup.scale.set(scale, scale, scale);

            this.scene.add(treeGroup);
        }
    }

    initChristmasTree() {
        const tree = THREE.Cache.get('christmastree').scene;
        tree.position.set(0.4, 0.5, 1)
        tree.scale.set(0.25, 0.25, 0.25)
        tree.castShadow = true;
        tree.receiveShadow = true;

        const lamp = new Lamp()
        lamp.position.set(0, 0, 0.4)
        lamp.scale.set(0.7, 0.7, 0.7)
        this.scene.add(tree, lamp)
    }

    initHouses() {
        const houseData = [
            { x: -1.6, z: 0.3, rotY: 1.5 },
            { x: 2, z: -1, rotY: -0.3 },
            { x: 2.5, z: 0.5, rotY: -1.6 },
        ];

        const houseModel = THREE.Cache.get('house').scene;
        const scale = 0.5;

        for (let i = 0; i < houseData.length; i++) {

            const house = houseModel.clone();
            house.scale.set(scale, scale, scale);
            const position = houseData[i];
            house.position.set(position.x, 0, position.z)
            house.rotation.y = houseData[i].rotY

            this.scene.add(house)
        }
    }
}