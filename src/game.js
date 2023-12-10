import * as THREE from 'three';
import * as TWEEN from '@tweenjs/tween.js';
import Environment from './scene/environment';
import Player from './scene/player';
import TPCamera from './kernel/third-person-camera'
import { Vector3 } from 'three';

export default class Game extends THREE.Object3D {
    constructor(scene, camera, renderer) {
        super();
        this.scene = scene;
        this.camera = camera;
        this.renderer = renderer;
    }

    init() {
        this.environment = new Environment(this.scene)
        this.scene.add(this.environment);

        this.playerCont = new THREE.Group();
        this.player = new Player("adventurer");
        this.player.position.set(0, 0, 0)
        this.playerCont.add(this.player)
        this.scene.add(this.playerCont);

        this.camera.position.set(0, 0.5, this.player.position.z - 1)
        this.playerCont.add(this.camera)
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
        const intersects = raycaster.intersectObjects(this.scene.children, true);

        if (intersects.length > 0) {
            // Handle the click on the first intersected object (intersects[0].object)
            // For example, you might want to perform some action on the clicked object
            const clickedObject = intersects[0].object;
            if (clickedObject.name) console.log('Clicked object:', clickedObject.name); else console.log('Clicked object:', clickedObject);
        }
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

        const rotationAmount = 0.3;

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
        this.playerCont.position.x += 0.1;
        this.playerCont.rotation.y += rotationAmount;
    }

    moveRight(rotationAmount) {
        this.playerCont.position.x -= 0.1;
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