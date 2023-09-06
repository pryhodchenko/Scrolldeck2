import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// Create the scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(  0x7FFFD4 );


// Load the TV model using GLTFLoader
const loader = new GLTFLoader();
loader.load('tv_min.glb', function (gltf) {
  const tvModel = gltf.scene;
  tvModel.position.set(0, -20, 0); // Adjust position if needed
  tvModel.scale.set(1, 1, 1); // Adjust scale if needed
  scene.add(tvModel);
}, undefined, function (error) {
  console.error(error);
});

// Create a material for the mesh
const material = new THREE.MeshStandardMaterial({
  color: 0xCD5C5C,
  roughness: 0.6
});

// Create the camera
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 90;
camera.position.x = 30;
scene.add(camera);

// Create a WebGL renderer and attach it to the canvas
const canvas = document.querySelector('.tv');
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);

// Add OrbitControls to enable camera interaction

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = false; // Disable zooming
controls.autoRotate = true; // Enable auto-rotation
controls.autoRotateSpeed = 2; // Set auto-rotation speed

// Create a point light and add it to the scene
const light1 = new THREE.PointLight(0xffffff, 200); // Increase intensity
light1.position.set(10, 20, 30);
light1.intensity = 3;
scene.add(light1);

// Create more lights
const light2 = new THREE.PointLight(0xff0000, 100); // Increase intensity
light2.position.set(-10, 200, 0);
light2.intensity = 3;
scene.add(light2);

const light3 = new THREE.SpotLight(0x00ff00, 100); // Increase intensity
light3.position.set(100, 0, 0);
scene.add(light3);

const light4 = new THREE.DirectionalLight(0x0000ff, 2); // Increase intensity
light4.position.set(0, 40, -10);
scene.add(light4);

const light5 = new THREE.HemisphereLight(0xffff00, 0x0000ff, 1); // Increase intensity
light5.intensity = 2;
scene.add(light5);



// Create more lights from opposite directions and make them stronger
const light6 = new THREE.DirectionalLight(0xff00ff, 2);
light6.position.set(0, -40, 10);
scene.add(light6);

const light7 = new THREE.PointLight(0x00ffff, 150);
light7.position.set(0, 0, 100);
scene.add(light7);

const light8 = new THREE.SpotLight(0xffff00, 150);
light8.position.set(-100, 0, 0);
scene.add(light8);

const light9 = new THREE.DirectionalLight(0x00ff00, 2);
light9.position.set(0, -40, 10);
scene.add(light9);

const light10 = new THREE.PointLight(0xff0000, 100);
light10.position.set(10, 100, 0);
scene.add(light10);

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  // Add any animations or updates here
  
  controls.update(); // Update OrbitControls
  renderer.render(scene, camera);
}

animate();
