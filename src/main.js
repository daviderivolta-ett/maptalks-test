// Import modules
import * as THREE from 'three';
import * as maptalksThree from 'maptalks.three';
import { map } from './map.js';

// PCD module
import { PCDLoader } from 'three/addons/loaders/PCDLoader.js';

// Add 3d element to map
const threeLayer = new maptalksThree.ThreeLayer('t');
threeLayer.prepareToDraw = function (gl, scene, camera) {
    // light
    const light = new THREE.DirectionalLight(0xffffff);
    light.position.set(0, -10, -10).normalize();
    scene.add(light);

    // green box
    const geometry = new THREE.BoxGeometry(10000, 10000, 10000);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(0, 0, 0);

    scene.add(cube);

    // green pcd bunny
    const vertexShader =
        `
        void main() {
            gl_PointSize = 6.0;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
        `
        ;

    const fragmentShader =
        `
        void main() {
            gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0);
        }
        `
        ;

    const pcdMaterial = new THREE.ShaderMaterial({
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
    });

    const loader = new PCDLoader();
    loader.load('/src/pcd/bunny.pcd', function (points) {

        points.name = 'Bunny.pcd';
        const pcdPoints = new THREE.Points(points.geometry, pcdMaterial);
        pcdPoints.scale.set(1000, 1000, 1000);
        pcdPoints.position.set(2000, 88000, 0);

        scene.add(pcdPoints);

    },
        function (xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        function (error) {
            console.log('An error happened');
            console.log(error);
    });
};

threeLayer.addTo(map);