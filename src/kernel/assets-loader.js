import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import christmastree from '/assets/nature/ChristmasTree.glb'
import sky from '/assets/sky.jpg'
import mountains from '/assets/city scene/Mountain Group.glb'
import pineTrees from '/assets/city scene/Pine Trees.glb'
import house from '/assets/city scene/House.glb'
import lamp from '/assets/city scene/Lamp.glb'
import adventurer from '/assets/characters/Adventurer.glb'
import casual from '/assets/characters/Casual Character.glb'

export default class AssetsLoader {
    constructor() {
        this.textureLoader = new THREE.TextureLoader();
        this.GLBLoader = new GLTFLoader();
        this._count = 0;
        this.onLoadCallback = null;
    }

    load(onLoad) {
        this.onLoadCallback = onLoad;

        const models3D = [
            { name: 'christmastree', asset: christmastree },
            { name: 'mountains', asset: mountains },
            { name: 'pineTrees', asset: pineTrees },
            { name: 'house', asset: house },
            { name: 'lamp', asset: lamp },
            { name: 'adventurer', asset: adventurer },
            { name: 'casual', asset: casual },
        ];

        const textures = [
            { name: 'sky', asset: sky },
        ];

        this._count = models3D.length + textures.length;

        if (this._count === 0) {
            this.handleLoadComplete();
            return;
        }

        for (let i = 0; i < models3D.length; i++) {
            const obj = models3D[i];
            this.GLBLoader.load(obj.asset, (object3d) => {
                THREE.Cache.add(obj.name, object3d);
                this._count--;
                if (this._count === 0) this.handleLoadComplete();
            });
        }


        for (let i = 0; i < textures.length; i++) {
            const txt = textures[i];
            const textureMain = this.textureLoader.load(txt.asset, () => {
                textureMain.flipY = false;
                THREE.Cache.add(txt.name, textureMain);
                this._count--;
                if (this._count === 0) this.handleLoadComplete();
            });
        }
    }

    handleLoadComplete() {
        if (this.onLoadCallback) {
            this.onLoadCallback();
            console.log(`%c Assets Loaded `, `background-color:#ff0000;color:#ffffffff`)
        }
    }
}