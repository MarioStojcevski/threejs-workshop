import * as THREE from 'three';
import * as TWEEN from '@tweenjs/tween.js';
import Environment from './scene/environment';
import Player from './scene/player';
import Person from './scene/person';

export default class Game extends THREE.Object3D {
    constructor(scene, camera, renderer) {
        super();
        this.scene = scene;
        this.camera = camera;
        this.renderer = renderer;
        this.clickableObjects = []
    }

    async init() {
        await this.initPlayer();
        await this.initEnvironment();
        await this.initNPCs();
    }

    async initEnvironment() {
        this.environment = new Environment(this.scene)
        this.scene.add(this.environment);
    }

    async initPlayer() {
        this.playerCont = new THREE.Group();
        this.player = new Player("adventurer");
        this.player.position.set(0, 0, 0)
        this.playerCont.add(this.player)
        this.scene.add(this.playerCont);


    }

    async initNPCs() {
        const npcData = [
            { x: 0.5, z: 0.1, rotY: -1.5 },
            { x: 1.5, z: -0.5, rotY: -0.3 },
            { x: -1, z: 0.5, rotY: 1.6 },
        ];

        this.NPC = new Person("casual");
        const scale = 0.5;
        const position = npcData[0];
        this.clickableObjects.push(this.NPC)
        this.NPC.position.set(position.x, 0, position.z)
        this.NPC.name = "NPC"
        this.scene.add(this.NPC)

        //         for (let i = 0; i < npcData.length; i++) {
        // 
        //             const npc = npcModel.clone();
        //             // npc.scale.set(scale, scale, scale);
        //             // const position = npcData[i];
        //             // npc.position.set(position.x, 0, position.z)
        //             // npc.rotation.y = npcData[i].rotY
        //         }
    }

    onClick(x, y) {
        this.checkClick(x, y)
    }
    checkClick(x, y) {
        //make a raycaster plane attached to the camera, that transforms the click to 3d space and checks if it is clicking on something in the scene children
        const mouse = new THREE.Vector2();
        mouse.x = (x / window.innerWidth) * 2 - 1;
        mouse.y = -(y / window.innerHeight) * 2 + 1;

        // Create a raycaster
        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(mouse, this.camera);

        // Find intersected objects
        const intersects = raycaster.intersectObjects(this.clickableObjects, true);

        if (intersects.length > 0) {
            const clickedObject = intersects[0].object;
            if (this.NPC && this.player && this.player.position.distanceTo(this.NPC.position) < 1) {
                this.handleInteractWNPC();

            } else {
                console.log('Clicked object:', clickedObject);
            }
        }
    }

    handleInteractWNPC() {
        this.player.playAnimation("CharacterArmature|Interact");

        let pos = new THREE.Vector3();
        pos = this.NPC.getWorldPosition(pos);
        this.player.lookAt(pos);
        pos = this.player.getWorldPosition(pos);
        this.NPC.lookAt(pos);

        this.NPC.speak();
        setTimeout(() => {
            this.player.speak();
            this.NPC.playAnimation("CharacterArmature|Interact");
        }, 1000)

    }

    onMove(direction) {
        // this.player.onMove(direction);
        this.handleKeypress(direction)
    }

    handleKeypress(direction) {
        console.log(direction);
        if (direction === "back") {
            this.player.reverseAnimation("CharacterArmature|Walk");
        } else if (direction === "space") {
            console.log("space");
        } else {
            this.player.playAnimation("CharacterArmature|Walk");
        }

        const rotationAmount = 0.1;

        switch (direction) {
            case "left":
                this.moveLeft(rotationAmount);
                break;
            case "right":
                this.moveRight(rotationAmount);
                break;
            case "forward":
                this.moveForward();
                break;
            case "back":
                this.moveBackward();
                break;
            case "jump":
                this.player.jump();
                break;
            default:
                break;
        }
    }

    moveLeft(rotationAmount) {
        this.playerCont.rotation.y += rotationAmount;
    }

    moveRight(rotationAmount) {
        this.playerCont.rotation.y -= rotationAmount;
    }

    moveForward() {
        const angle = this.playerCont.rotation.y;
        this.moveInDirection(angle);
    }

    moveBackward() {
        const angle = this.playerCont.rotation.y + Math.PI;
        this.moveInDirection(angle);
    }

    moveInDirection(angle) {
        this.playerCont.position.z += 0.1 * Math.cos(angle);
        this.playerCont.position.x += 0.1 * Math.sin(angle);
    }


    update(elapsed) {
        TWEEN.update();

        // if (this.tpcamera) this.tpcamera.update()
        if (this.player) {
            let position = new THREE.Vector3()
            position = this.player.getWorldPosition(position)
            this.camera.lookAt(position)
        }
    }

}