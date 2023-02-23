import * as THREE from 'three'

const size = {
    width: 800,
    height: 600
}

const render = function () {
    // забираем дом узел канваса
    const canvas = document.querySelector('#canvas');
    if (!canvas) return;
    const scene = new THREE.Scene();
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 'cyan' });
    // создаем меш (каркас фигуры) из геометрии и материала
    const mesh = new THREE.Mesh(geometry, material);
    // добавляем фигуру на сцену
    scene.add(mesh);
    // дальше добавляем камеру
    const camera = new THREE.PerspectiveCamera(75, size.width / size.height);
    camera.position.set(1, 1, 4)
    scene.add(camera);
    // добавляем оси координат на сцену
    const axes = new THREE.AxesHelper();
    scene.add(axes)
    // добавляем канвас в редерер WebGL
    const renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setSize(size.width, size.height);
    renderer.render(scene, camera);
}

document.addEventListener("DOMContentLoaded", render);
