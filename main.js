import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import {gsap} from 'gsap'
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js'

// Scene
const scene = new THREE.Scene(); 
const loader = new GLTFLoader();

loader.load( 'tv.glb')//, function ( gltf ) { scene.add( gltf.scene ); }, undefined, function ( error ) { console.error( error ); } );

// Create sphere
const geometry = new THREE.SphereGeometry(4, 70, 70); // radius (size), segments width, segments height

//const geometry = loader()

const material = new THREE.MeshStandardMaterial({
  color: 0xCD5C5C, // Use hexadecimal color format
  roughness: 0.6
});

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Light
const light = new THREE.PointLight(0xffffff, 100);
const light2 = new THREE.PointLight(0xFF0000, 100);
const light3 = new THREE.PointLight(0x00FF7F, 100);
light.position.set(0, 10, 10)
//light.intensity = 1
light2.position.set(-30, 5, 0)
//light2.intensity = 1
light3.position.set(24, 6, -10)
//light3.intensity = 1
scene.add(light);
scene.add(light2);
scene.add(light3);

//Sizes
const sizes = {
  width:innerWidth,
  heigth:innerHeight,
}

// Camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.heigth);
//const camera1 = new THREE.PerspectiveCamera(23, sizes.width / sizes.heigth);


camera.position.z = 20;
scene.add(camera);



// Renderer
const canvas = document.querySelector('.webgl'); // Use 'document' to query the DOM
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.heigth);
renderer.render(scene, camera);
renderer.setPixelRatio(2); //more smooth borders


//Controls
const controls = new OrbitControls(camera,canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = false;
controls.autoRotate = true;
controls.autoRotateSpeed =10;
//controls.enableRotate = false;

//resize
window.addEventListener('resize',() => {
  //update the sizes
  sizes.width = window.innerWidth;
  sizes.heigth = window.innerHeight

  //update camera
  camera.updateProjectionMatrix()
  camera.aspect = sizes.width / sizes.heigth
  renderer.setSize(sizes.width,sizes.heigth)
})

const loop = () => {
  controls.update();
  renderer.render(scene,camera);
  window.requestAnimationFrame(loop); 
} 
loop();

//timeline magic
const tl=gsap.timeline({defaults:{duration: 1} }) //sync few animations together
tl.fromTo(mesh.scale, {z:0, x:0, y:0 },{z:1, x:1, y:1})
//in video he add some other animation with same principle https://www.youtube.com/watch?v=_OwJV2xL8M8 36m

//mouse animation color

let mouseDown = false;
let rgb = [];
window.addEventListener('mousedown',() => (mouseDown=true));
window.addEventListener('mouseup',() => (mouseDown=false));

window.addEventListener("mousemove",(e) => {
  if (mouseDown) {
    rgb = [
      Math.round(Math.random()*255),
      Math.round((e.pageX/sizes.width) * 255),
      Math.round((e.pageY/sizes.heigth) * 255)
    ]
  
//Lets animate
let newColor = new THREE.Color(`rgb(${rgb.join(",")})`);
//new THREE.color(rgb(0,100,150))
 gsap.to(mesh.material.color,{
  r: newColor.r,
  g: newColor.g,
  b: newColor.b,
})
}})