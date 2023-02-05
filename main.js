 import'./style.css'
 import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';




 const scene = new THREE.Scene();
 const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight,0.1,1000);
 const renderer = new THREE.WebGL1Renderer({
    canvas: document.querySelector('#bg'),

 });
 renderer.setPixelRatio(window.devicePixelRatio);
 renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

const geometry = new THREE.TorusGeometry(10,2,16,100)
const material = new THREE.MeshStandardMaterial({ color:0xFF6347});
const tours = new THREE.Mesh(geometry, material);

scene.add(tours)

const light = new THREE.DirectionalLight(0xffffff)
light.position.set(25,25,25)
// scene.add(light) 
 
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(light, ambientLight)

const lightHelper = new THREE.PointLightHelper(light)
const gridHelper = new THREE.GridHelper(100,50);
scene.add(lightHelper);

const controls = new OrbitControls(camera, renderer.domElement);

function addStar(){
    const geometry = new THREE.SphereGeometry(0.25,24,24);
    const material = new THREE.MeshStandardMaterial({ color:0xFF6347});
   const star = new THREE.Mesh(geometry, material );
const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
star.position.set(x, y, z);
scene.add(star);
}
Array(200).fill().forEach(addStar)
const spaceTexture = new THREE.TextureLoader().load('/earth-1756274_1920.jpg');
scene.background = spaceTexture;

//Avatar
const simoTexture = new THREE.TextureLoader().load('/unnamed.webp')
const simo = new THREE.Mesh(
new THREE.BoxGeometry(3,3,3),
new THREE.MeshBasicMaterial({ map: simoTexture }),

);
scene.add(simo );

const logoTexture = new THREE.TextureLoader().load('Simo eGy.png')

const logo = new THREE.Mesh(
    new THREE.SphereGeometry(3,31,32 ),
    new THREE.MeshStandardMaterial({
        map: logoTexture,
    })
 );

logo.position.z = 10;
logo.position.setX(-10);
scene.add(logo );


function moveCamera(){
    const t = document.body.getBoundingClientRect().top;

    logo.rotation.x +=0.05;
    logo.rotation.x +=0.075;
    logo.rotation.x +=0.05;
    
    simo.rotation.y +=0.01;
    simo.rotation.z +=0.01;

    camera.position.z = t * -0.01;
    camera.position.x = t * -0.0002;
    camera.position.y = t * -0.0002;


}

document.body.onscroll=moveCamera;

 
function animate() {
    requestAnimationFrame(animate);
     tours.rotation.x +=0.01;
    tours.rotation.y +=0.005;
    tours.rotation.z +=0.01;
    
    controls.update();
     
    renderer.render(scene, camera);

  }
animate();