import * as THREE from 'three'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import './styles.scss'

/**
 * Constants
 */
const size = {
    width: window.innerWidth,
    height: window.innerHeight
}

/** Instances */
const canvas: HTMLElement = document.querySelector('#canvas');
const renderer = new THREE.WebGLRenderer({ canvas });
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, size.width / size.height);
const geometry = new THREE.BoxGeometry(2, 0.5, 0.05);
const material1 = new THREE.MeshBasicMaterial({ color: 'white' });
const material2 = new THREE.MeshBasicMaterial({ color: 'blue' });
const material3 = new THREE.MeshBasicMaterial({ color: 'red' });
const mesh1 = new THREE.Mesh(geometry, material1);
const mesh2 = new THREE.Mesh(geometry, material2);
const mesh3 = new THREE.Mesh(geometry, material3);
const controls = new OrbitControls(camera, canvas);

// Тут будет храниться таймстамп для расчета длительности тика:
let time: number;

/** Methods */
const tick = (meshes: THREE.Mesh | THREE.Mesh[]) => {
    // Синхронизация скорости анимации на любых устройствах за счет умножения на разницу времени между тиками
    // Частота тиков на устройствах разная в зависимости от мощности железа
    const currentTime = Date.now();
    const deltaTime = currentTime - time;
    time = currentTime;

    const delta = 0.001 * deltaTime;

    if (Array.isArray(meshes)) {
        meshes.forEach((mesh) => {
            mesh.rotation.y += delta;
        })
    } else {
        meshes.rotation.y += delta;
    }

    renderer.render(scene, camera);
    window.requestAnimationFrame(() => tick(meshes));
}
const toggleFullscreen = () => {
}
const toggleAnimation = () => {

}
const handleKey: EventListener = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
        toggleFullscreen()
    }
}

/**
 * Отрисовка, вызывает цикл тиков через requestAnimationFrame
 */
const render = function () {
    if (!canvas) return;
    mesh1.position.set(0, 0.5, 0);
    mesh2.position.set(0, 0, 0);
    mesh3.position.set(0, -0.5, 0);
    // добавляем фигуру на сцену
    scene.add(mesh1, mesh2, mesh3);
    camera.position.set(1, 1, 4)
    scene.add(camera);
    // передвигаем камеру, чтобы смотрела прямо на центральный объект
    camera.lookAt(mesh2.position)
    // добавляем оси координат на сцену
    const axes = new THREE.AxesHelper(2);
    scene.add(axes);
    renderer.setSize(size.width, size.height);
    // Добавляем анимацию вращения для всех переданных мешей
    time = Date.now();
    tick([mesh1, mesh2, mesh3])
}

document.addEventListener("DOMContentLoaded", render);
document.addEventListener("keypress", handleKey);
