import * as THREE from 'three';
// import { color } from 'three/tsl';
// import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );

document.body.appendChild( renderer.domElement );
camera.position.z = 5;

const hemiLight = new THREE.DirectionalLight(0xFFFFFF,3);
hemiLight.position.set(-1,2,4);
scene.add(hemiLight);

const texLoader = new THREE.TextureLoader();
const texture1 = texLoader.load('public/textures/texture1.png');

function makeInstance(geometry, color, x){

  const material = new THREE.MeshPhongMaterial({color});

  const cube = new THREE.Mesh(geometry,material);
  scene.add(cube);
  cube.position.x = x;

  return cube; 
}

const geometry = new THREE.BoxGeometry(1,1,1);
const cubes = [
  makeInstance(geometry , 0x44aa88, 0),
  makeInstance(geometry, 0x44aa88,-2),
];

const material = new THREE.MeshPhongMaterial( { map: texture1 });
const geometry2 = new THREE.SphereGeometry(0.5, 32, 52);
const sphere = new THREE.Mesh( geometry2 , material );
scene.add (sphere); 
sphere.position.x = 2



function animate( time ) {
  time *= 0.0012;

    cubes.forEach(( cube , ndx) =>{
      const speed = 1 + ndx * .1;
      const rot = time * speed;
      cube.rotation.x = rot ;
      cube.rotation.y = rot;
  });
  renderer.render( scene, camera );
}

renderer.setAnimationLoop( animate );