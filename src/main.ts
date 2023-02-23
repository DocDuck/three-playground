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
    const geometry = new THREE.BoxGeometry(2, 0.5, 1);
    const material1 = new THREE.MeshBasicMaterial({ color: 'white' });
    const material2 = new THREE.MeshBasicMaterial({ color: 'blue' });
    const material3 = new THREE.MeshBasicMaterial({ color: 'red' });
    // создаем меш (каркас фигуры) из геометрии и материала
    const mesh1 = new THREE.Mesh(geometry, material1);
    const mesh2 = new THREE.Mesh(geometry, material2);
    const mesh3 = new THREE.Mesh(geometry, material3);
    mesh1.position.set(0, 0.5, 0);
    mesh2.position.set(0, 0, 0);
    mesh3.position.set(0, -0.5, 0);

    // добавляем фигуру на сцену
    scene.add(mesh1, mesh2, mesh3);
    // дальше добавляем камеру
    const camera = new THREE.PerspectiveCamera(75, size.width / size.height);
    camera.position.set(1, 1, 4)
    scene.add(camera);
    // передвигаем камеру, чтобы смотрела прямо на объект
    camera.lookAt(mesh1.position)
    // добавляем оси координат на сцену
    const axes = new THREE.AxesHelper(2);
    scene.add(axes);
    // добавляем канвас в редерер WebGL
    const renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setSize(size.width, size.height);
    renderer.render(scene, camera);
}

document.addEventListener("DOMContentLoaded", render);
