import './style.css'
import * as THREE from 'three'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)

/*
mesh.position.x = 0.7;
mesh.position.y = -0.6;
mesh.position.z = 1;
*/

// Alternative to position: Set X Y Z
mesh.position.set(0.7, -0.6, 1);

// Scale: Set X Y Z
mesh.scale.set(2,0.5,0.5);

// Rotation: Step-by-step so we don't get  "Gimbal Lock"
// First X, then Y, then Z
mesh.rotation.reorder('XYZ');
const qr = Math.PI * 0.25;

// First X, then Y, then Z
mesh.rotation.set(qr, qr, -qr/2);

scene.add(mesh)

// Axes Helper, number inside make axes longer/shorter
const axesHelper = new THREE.AxesHelper(2);
scene.add(axesHelper);

// Group example
const cubeA = new THREE.Mesh( geometry, material );
cubeA.position.set( 2, 2, 0 );

const cubeB = new THREE.Mesh( geometry, material );
cubeB.position.set( -2, -2, 0 );

//create a group and add the two cubes
//These cubes can now be rotated / scaled etc as a group
const group = new THREE.Group();
group.add( cubeA );
group.add( cubeB );

scene.add( group );

/**
 * Sizes
 */
const sizes = {
    width: 800,
    height: 600
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)

//camera.position.z = 3
// SET X Y Z
camera.position.set(0.8,-0.5,10);

// Alternative to POSITION Camera: LookAt
camera.lookAt(mesh.position);

scene.add(camera)



/*
* Gives me the distance between the MESH and the CAMERA
*/
console.log(mesh.position.distanceTo(camera.position));

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
/* FINAL MOMENT, AFTER THIS ANY CHANGE WILL NOT BE VISIBLE */
renderer.render(scene, camera)