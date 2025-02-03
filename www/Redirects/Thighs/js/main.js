import * as THREE from 'https://cdn.skypack.dev/three@0.133.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.133.0/examples/jsm/loaders/GLTFLoader.js';
import { TextGeometry } from 'https://cdn.skypack.dev/three@0.133.0/examples/jsm/geometries/TextGeometry.js';
import { FontLoader } from 'https://cdn.skypack.dev/three@0.133.0/examples/jsm/loaders/FontLoader.js';

// Set up scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let loaded = false;
let model1, model2;
let textMesh;
let rotation = 0;
// Add lighting
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(1, 5, 5);
scene.add(light);

// Create a parent object at (0,0,4)
const pivot = new THREE.Object3D();
pivot.position.set(0, 0, 4);
scene.add(pivot);

// Load Model
function CreateModel(){
const loaderGLTF = new GLTFLoader();
loaderGLTF.load("../../Static/thighs.glb", function (gltf) {
    scene.background = new THREE.Color("Gray");
    model1 = gltf.scene.children[0];
    model2 = gltf.scene.children[1];
    model1.material = new THREE.MeshBasicMaterial({color: 0x00ff00, wireframe: true});
    model2.material = new THREE.MeshBasicMaterial({color: 0x000000, wireframe: true});
    pivot.add(model1);
    pivot.add(model2);
}, undefined, function (error) {
    console.error("Model loading error:", error);
});
}
function CreateText(){
const TextLoader = new FontLoader();
//Text Loading
TextLoader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function (font) {
    const textGeometry = new TextGeometry('Thigh Gap!', {
        font: font,
        size: 0.1,
        height: 0.02
    });

    const textMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    textMesh = new THREE.Mesh(textGeometry, textMaterial);
    textMesh.position.set(-0.35, -0.35, 0); // Offset by -1 on X (relative to pivot)
    pivot.add(textMesh);
}, undefined, function (error) {
    console.error("Text loading error:", error);
});
}

camera.position.z = 5;
CreateModel();
CreateText();


// Animation loop
function animate() {
    requestAnimationFrame(animate);
    if (typeof model1 !== "undefined" && typeof model2 !== "undefined" && typeof textMesh !== "undefined") {
        pivot.rotation.y += 0.01; // Rotate the parent object
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
