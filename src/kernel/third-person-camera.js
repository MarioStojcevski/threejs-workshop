import * as THREE from 'three';

export default class TPCamera {
    constructor(camera, player) {
        this.camera = camera;
        this.player = player;
        this.goal = new THREE.Object3D();
        this.follow = new THREE.Object3D();
        this.follow.position.z = -0.1; // Setting the initial position behind the player
        this.player.add(this.follow);
        this.goal.add(this.camera);
    }

    update() {

        this.camera.position.set(0, 0.5, this.player.position.z - 1)
        const look = new THREE.Vector3(this.player.position.x, 1, 30)
        this.camera.lookAt(look);
    }
}
