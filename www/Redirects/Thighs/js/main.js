import * as THREE from 'https://cdn.skypack.dev/three@0.133.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.133.0/examples/jsm/loaders/GLTFLoader.js';

// Set up scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let loaded = false;
let model1, model2;
// Add lighting
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(1, 5, 5);
scene.add(light);

// Load Model
const loader = new GLTFLoader();
loader.load("../../Static/thighs.glb", function (gltf) {
    scene.add(gltf.scene);
    model1 = gltf.scene.children[0];
    model2 = gltf.scene.children[1];
    model1.material = new THREE.MeshBasicMaterial({color: 0x00ff00, wireframe: true});
    model2.material = new THREE.MeshBasicMaterial({color: 0x00ff00, wireframe: true});
    model1.position.z = 4;
    model2.position.z = 4;
    loaded = true;
}, undefined, function (error) {
    console.error("Model loading error:", error);
});

// Add a simple object (replace this with a loaded model later)

camera.position.z = 5;

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    if (loaded) {
        model1.rotation.y += 0.01;
        model2.rotation.y += 0.01;
    }
    renderer.render(scene, camera);
}
animate();

// Handle window resizing
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
