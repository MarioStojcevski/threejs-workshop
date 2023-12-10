import * as THREE from 'three'
import Lamp from './lamp';

export default class Environment extends THREE.Object3D {
    constructor(scene, camera, renderer) {
        super();
        this.scene = scene;
        this.camera = camera;
        this.renderer = renderer;
        this.init();
    }

    init() {
        this.initMaterials();

        this.initSkybox();
        this.initGround()
        this.initChristmasTree();
        this.initTrees();
        this.initHouses();
    }

    initSkybox() {
        const geometry = new THREE.SphereGeometry(50);
        const material = new THREE.MeshPhysicalMaterial({ color: 0xffffff, side: THREE.DoubleSide, map: THREE.Cache.get("sky") });
        material.map.flipY = true
        const skybox = new THREE.Mesh(geometry, material);
        skybox.position.set(0, -0.5, 0)

        this.scene.add(skybox);
    }
    initGround() {
        const geometry = new THREE.CylinderGeometry(4, 4, 0.1);
        const material = new THREE.MeshPhysicalMaterial({ color: 0xffffff });
        this.floor = new THREE.Mesh(geometry, material);
        this.floor.position.set(0, 0, 0)
        this.floor.receiveShadow = true;
        this.scene.add(this.floor);


        const mountains = THREE.Cache.get('mountains').scene;
        mountains.position.set(0, 0, -2.4)
        mountains.scale.set(1, 1, 1)
        mountains.castShadow = true;
        mountains.receiveShadow = true;

        mountains.traverse((child) => {
            child.castShadow = true;
            if (child.material) {
                if (child.material.name === 'Stone') {
                    child.material = this.stoneMaterial;
                }
                if (child.material.name === 'Snow') {
                    child.material = this.snowMaterial;;
                }
                if (child.material.name === 'Dirt') {
                    child.material = this.snowMaterial;
                }
            }
        })

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

            treeGroup.traverse((child) => {
                child.castShadow = true;

                if (child instanceof THREE.Mesh)
                    child.material = this.foliageMaterial;
            })

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
        lamp.scale.set(1.25, 1.25, 1.25)
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

            house.traverse((child) => {
                child.castShadow = true;
                if (child.material) {
                    if (child.material.name === 'Stone_Light') {
                        child.material = new THREE.MeshPhysicalMaterial({ color: 0x757371 });
                    }
                    if (child.material.name === 'Stone_Dark') {
                        child.material = new THREE.MeshPhysicalMaterial({ color: 0x575966 });
                    }
                    if (child.material.name === 'Stone') {
                        child.material = this.stoneMaterial;
                    }
                    if (child.material.name === 'RoofTiles') {
                        child.material = new THREE.MeshPhysicalMaterial({
                            color: 0xAA4A44,
                            metalness: 0.1,
                            roughness: 0.5,
                            emissive: 0x400000,
                            emissiveIntensity: 1
                        });
                    }
                    if (child.material.name === 'Windows') {
                        child.material = new THREE.MeshPhysicalMaterial({
                            color: 0xffffff,
                            transparent: true,
                            opacity: 0.5,
                            metalness: 1,
                            roughness: 0,
                            emissive: 0xffffff,
                            emissiveIntensity: 0.3
                        });
                    }
                    if (child.material.name === "Wood") {
                        child.material = new THREE.MeshPhysicalMaterial({
                            color: 0x000000,
                            metalness: 0,
                            roughness: 1,
                            emissive: 0x5A3300,
                            emissiveIntensity: 0.1
                        });
                    }
                    if (child.material.name === "Wood_Side") {
                        child.material = new THREE.MeshPhysicalMaterial({
                            color: 0x5A3300,

                        });
                    }
                    if (child.material.name === "Wood_Light") {
                        child.material = new THREE.MeshPhysicalMaterial({
                            color: 0x5A3300,

                        });
                    }
                    if (child.material.name === "Plaster") {
                        child.material = new THREE.MeshPhysicalMaterial({ color: 0xffffff });
                    }
                }
            })

            this.scene.add(house)
        }
    }

    initMaterials() {
        this.foliageMaterial = new THREE.MeshPhysicalMaterial({
            metalness: 0.1,
            roughness: 0.5,
            color: 0x097969,
            emissive: 0x097969,
            emissiveIntensity: 0.1
        });

        this.woodMaterial = new THREE.MeshPhysicalMaterial({
            color: 0x4B3A26,
        });

        this.stoneMaterial = new THREE.MeshPhysicalMaterial({ color: 0x69696e })
        this.snowMaterial = new THREE.MeshPhysicalMaterial({
            metalness: 0.1,
            roughness: 0.5,
            color: 0xffffff,
            emissive: 0xffffff,
            emissiveIntensity: 0.1
        })
    }
}