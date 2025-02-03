import * as THREE from "https://cdn.skypack.dev/three@0.133.0/build/three.module.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.133.0/examples/jsm/loaders/GLTFLoader.js";
import { TextGeometry } from "https://cdn.skypack.dev/three@0.133.0/examples/jsm/geometries/TextGeometry.js";
import { FontLoader } from "https://cdn.skypack.dev/three@0.133.0/examples/jsm/loaders/FontLoader.js";

// Set up scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let loaded = false;
let model1, model2, sprite;
let textMesh;
let rotation = 0;
// Create a parent object at (0,0,4)
const pivot = new THREE.Object3D();
pivot.position.set(0, 0, 4);
scene.add(pivot);
// Load Model
function CreateModel() {
  const loaderGLTF = new GLTFLoader();
  loaderGLTF.load(
    "../../Static/thighs.glb",
    function (gltf) {
      scene.background = new THREE.Color("Gray");
      model1 = gltf.scene.children[0];
      model2 = gltf.scene.children[1];
      model1.material = new THREE.MeshBasicMaterial({
        color: 0x00ff00,
        wireframe: true,
      });
      model2.material = new THREE.MeshBasicMaterial({
        color: 0x000000,
        wireframe: true,
      });
      pivot.add(model1);
      pivot.add(model2);
    },
    undefined,
    function (error) {
      console.error("Model loading error:", error);
    }
  );
}
function CreateText() {
  const TextLoader = new FontLoader();
  //Text Loading
  TextLoader.load(
    "../../Static/fonts/VCR OSD Mono_Regular.json",
    function (font) {
      const textGeometry = new TextGeometry("Thicc", {
        font: font,
        size: 0.1,
        height: 0.01,
      });

      const textMaterial = new THREE.MeshBasicMaterial({
        color: 0xa00000,
        transparent: true,
        opacity: 1,
      });
      textMesh = new THREE.Mesh(textGeometry, textMaterial);
      textMesh.position.set(0.48, 0, 4); // Offset by -1 on X (relative to pivot)
      scene.add(textMesh);
    },
    undefined,
    function (error) {
      console.error("Text loading error:", error);
    }
  );
}

function CreateSprite() {
  const textureLoader = new THREE.TextureLoader();
  const texture = textureLoader.load("../../Static/pointer.png");

  const spriteMaterial = new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
  });
  sprite = new THREE.Sprite(spriteMaterial);
  sprite.position.set(0.125, 0.12, 0);
  sprite.scale.set(0.0625, 0.0625, 0.0625); // Adjust size (X, Y, Z)
  pivot.add(sprite);

}

camera.position.z = 5;
const LineOrigin = new THREE.Object3D();
LineOrigin.position.set(0.35, 0.35, 0);
pivot.add(LineOrigin);
let points = [new THREE.Vector3(0, 0, 4), new THREE.Vector3(0, 0, 4)];
var geometry = new THREE.BufferGeometry().setFromPoints(points);
var material = new THREE.LineBasicMaterial({
  color: 0xa0ff00,
  transparent: true,
  opacity: 1,
});
var line = new THREE.Line(geometry, material);
scene.add(line);
CreateModel();
CreateText();
CreateSprite();

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  if (
    typeof model1 !== "undefined" &&
    typeof model2 !== "undefined" &&
    typeof textMesh !== "undefined"
  ) {
    pivot.rotation.y += 0.005; // Rotate the parent object
    let vector3 = new THREE.Vector3();
    LineOrigin.getWorldPosition(vector3);
    points = [
      vector3.add(new THREE.Vector3(0, 0, -1.85)),
      new THREE.Vector3(0.5, 0, 4),
    ];
    geometry = new THREE.BufferGeometry().setFromPoints(points);
    line.geometry.dispose();
    line.geometry = geometry;
    if (pivot.rotation.y > 6.28) {
      pivot.rotation.y = 0;
    }
    if (pivot.rotation.y > 1.57 && pivot.rotation.y < 4.71) {
      if (line.material.opacity > 0) {
        line.material.opacity -= 0.01;
      }
    } else if (line.material.opacity < 1) {
      line.material.opacity += 0.005;
    }
    textMesh.material.color.r = pivot.rotation.y / 6.28;
    textMesh.material.color.b = 1-textMesh.material.color.r;
    textMesh.material.opacity = line.material.opacity;
    sprite.material.opacity = line.material.opacity*2;
  }
  renderer.render(scene, camera);
}
animate();

// Handle window resizing
window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});
