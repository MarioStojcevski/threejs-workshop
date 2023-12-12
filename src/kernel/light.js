import * as THREE from 'three'

export default class Light extends THREE.Object3D {
    constructor(scene, camera, renderer) {
        super();
        this.scene = scene;

        this.init();
    }

    init() {
        const ambientLight = new THREE.AmbientLight(0xffffff, 2);
        ambientLight.visible = true;
        this.scene.add(ambientLight);
        Light.ambientLight = ambientLight;

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
        directionalLight.position.set(-0.5, 1, 0); // looks at (0; 0; 0)
        directionalLight.visible = true;
        this.scene.add(directionalLight);

        Light.directionalLight = directionalLight;
        
        //         directionalLight.shadow.camera.left = -6;
        //         directionalLight.shadow.camera.right = 6;
        //         directionalLight.shadow.camera.top = 8;
        //         directionalLight.shadow.camera.bottom = -6;
        // 
        //         directionalLight.castShadow = true;
        //         directionalLight.shadow.mapSize.width = 1024;
        //         directionalLight.shadow.mapSize.height = 1024;
        //         directionalLight.shadow.camera.near = 0.1;
        //         directionalLight.shadow.camera.far = 100;
    }
}