import * as THREE from 'three'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import './styles.scss'

const size = {
    width: window.innerWidth,
    height: window.innerHeight
}

// Тут будет храниться таймстамп для расчета длительности тика:
let time: number;

const tick = (renderer: THREE.WebGLRenderer, scene: THREE.Scene, camera: THREE.PerspectiveCamera, meshes: THREE.Mesh | THREE.Mesh[]) => {
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
    window.requestAnimationFrame(() => tick(renderer, scene, camera, meshes));
}
const toggleFullscreen = () => {

}
/**
 * Обработка клавиш
 */
const handleKey: EventListener = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
        toggleFullscreen()
    }
}

/**
 * Отрисовка, вызывает цикл тиков через requestAnimationFrame
 */
const render = function () {
    // забираем дом узел канваса
    const canvas: HTMLElement = document.querySelector('#canvas');
    if (!canvas) return;
    const scene = new THREE.Scene();
    const geometry = new THREE.BoxGeometry(2, 0.5, 0.05);
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
    // назначаем контролы для управления камерой
    // достаточно инстанциировать чтобы работало,
    // потому что под капотом навешивает eventListener'ы
    const controls = new OrbitControls(camera, canvas)
    // добавляем канвас в редерер WebGL
    const renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setSize(size.width, size.height);
    // Добавляем анимацию вращения для всех переданных мешей
    time = Date.now();
    tick(renderer, scene, camera, [mesh1, mesh2, mesh3])
}

document.addEventListener("DOMContentLoaded", render);
document.addEventListener("keypress", handleKey);