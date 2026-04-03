import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { add, cameraPosition, toneMapping } from 'three/tsl';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#c'),
});
// renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
camera.position.z = 0;
// camera.position.x = 3

// Lighting 
const hemiLight = new THREE.DirectionalLight(0xFFFFFF,3);
hemiLight.position.z=500;
scene.add(hemiLight);

// Grid helper
const gridHelper = new THREE.GridHelper(200,50);
// scene.add(gridHelper);

// textures 
const texLoader = new THREE.TextureLoader();
const texture1 = texLoader.load('/textures/texture1.png');
const earthTexture = texLoader.load('/textures/eath.jpg')

// scene background 
const sceneBG = texLoader.load('/bg/space.jpg');
scene.background = sceneBG;

// create stars
function addStar(){
  const geometry = new THREE.SphereGeometry(0.09,24,24);
  const material = new THREE.MeshPhongMaterial({color: 0xffffff});
  const star = new THREE.Mesh(geometry, material);

  const [x,y,z] = Array(3).fill().map(()=> THREE.MathUtils.randFloatSpread(30));

  star.position.set(x,y,z);
  scene.add(star);
}

Array(100).fill().forEach(addStar);

// // create object instance function
// function makeInstance(geometry, color, x){
//   const material = new THREE.MeshPhongMaterial({color});
//   const cube = new THREE.Mesh(geometry,material);
//   scene.add(cube);
//   cube.position.x = x;
//   return cube; 
// }

// const geometry = new THREE.BoxGeometry(1,1,1);
// const cubes = [
//   makeInstance(geometry , 0x44aa88, 0),
//   makeInstance(geometry, 0x44aa88,-2),
// ];

// mooon
const material = new THREE.MeshPhongMaterial( { map: texture1 });
const geometry2 = new THREE.SphereGeometry(1, 32, 52);
const moon = new THREE.Mesh( geometry2 , material );
scene.add (moon); 
moon.position.set(5,1,0)
let angle = 0 // angle of moon

// earth
const earthMaterial = new THREE.MeshPhongMaterial({map : earthTexture});
const geometry3 = new THREE.SphereGeometry(3,40,30);
const earth = new THREE.Mesh(geometry3,earthMaterial);
scene.add(earth);


const controls = new OrbitControls(camera, renderer.domElement);
controls.update();

// functionalities
function moveCamera(){
  const t = document.body.getBoundingClientRect().top;

  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  // Movement of moon
  angle += 0.01; // controls orbit speed

  moon.position.x = Math.cos(angle) * 10;
  moon.position.z = Math.sin(angle) * 6;
 
  // console.log(t);
  camera.position.x = t * - 0.0012;
  camera.position.y = t * - 0.0012;
  camera.position.z = t * - 0.013;
  // console.log(t*-0.01);
}

document.onscroll = moveCamera;

function animate( time ) {
  time *= 0.0012;

    // cubes.forEach(( cube , ndx) =>{
    //   const speed = 1 + ndx * .1;
    //   const rot = time * speed;
    //   cube.rotation.x = rot ;
    //   cube.rotation.y = rot;
  // });
    // moon.rotation.x = time;
    // earth.rotation.x = time*0.01;
    earth.rotation.y = time; 
    moon.rotation.y = time; 

  renderer.render( scene, camera );
}

renderer.setAnimationLoop( animate );