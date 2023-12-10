import * as THREE from 'three';
import * as TWEEN from '@tweenjs/tween.js';
import Environment from './scene/environment';
import Player from './scene/player';
import TPCamera from './kernel/third-person-camera'

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

        this.player = new Player("adventurer");
        this.scene.add(this.player);
        this.tpcamera = new TPCamera(this.camera, this.player)

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
        console.log(direction)
        if (direction === "back") this.player.reverseAnimation("CharacterArmature|Walk")
        if (direction === "space") console.log(space);
        else
            this.player.playAnimation("CharacterArmature|Walk");

        if (direction === "left") {
            this.player.position.x += 0.1;
            this.player.rotation.y = +Math.PI / 2
        }
        if (direction === "right") {
            this.player.position.x -= 0.1;
            this.player.rotation.y = -Math.PI / 2

        }
        if (direction === "forward") {
            this.player.position.z += 0.1;
            this.player.rotation.y = 0
        }
        if (direction === "back") {
            {
                this.player.position.z -= 0.1;
                this.player.rotation.y = 0

            }
        }
        if (direction === "jump")
            this.player.jump();
    }



    update(elapsed) {
        TWEEN.update();

        if (this.tpcamera) this.tpcamera.update()
    }

}