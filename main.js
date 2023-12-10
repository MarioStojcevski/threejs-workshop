import * as THREE from 'three';
import Game from './src/game';
import Light from './src/kernel/light';
import AssetsLoader from './src/kernel/assets-loader';
// import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { OutlinePass } from 'three/addons/postprocessing/OutlinePass.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// camera.position.set(0, 0.5, 0)
const renderer = new THREE.WebGLRenderer();
renderer.logarithmicDepthBuffer = true;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const game = new Game(scene, camera, renderer);
scene.add(game);
// const controls = new OrbitControls(camera, renderer.domElement);

window.addEventListener("click", (event) => {
  game.onClick(event.x, event.y)
});

window.addEventListener("keypress", (event) => {
  if (event.keyCode === 97) game.onMove("left")
  if (event.keyCode === 115) game.onMove("back")
  if (event.keyCode === 100) game.onMove("right")
  if (event.keyCode === 119) game.onMove("forward")
  if (event.keyCode === 32) game.onMove("jump")
});

const light = new Light(scene);
scene.add(light);
THREE.Cache.enabled = true;

const loader = new AssetsLoader();
loader.load(() => {
  game.init();
});

const composer = new EffectComposer(renderer);

const renderPass = new RenderPass(scene, camera);
composer.addPass(renderPass);

// 
// const effectPass = new OutlinePass(scene, camera);
// composer.addPass(effectPass);


function animate() {
  requestAnimationFrame(animate);
  // controls.update();
  // renderer.render(scene, camera);
  composer.render();

  game.update();
};

animate();