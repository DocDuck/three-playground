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

const getAspectRatio = () => size.width / size.height;

/** Instances */
const canvas: HTMLElement = document.querySelector('#canvas');
const renderer = new THREE.WebGLRenderer({ canvas });
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, getAspectRatio());
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
/** Flags */
let isAnimationEnabled = false;

/** Methods */
const tick = (meshes: THREE.Mesh | THREE.Mesh[]) => {
    // Синхронизация скорости анимации на любых устройствах за счет умножения на разницу времени между тиками
    // Частота тиков на устройствах разная в зависимости от мощности железа
    const currentTime = Date.now();
    const deltaTime = currentTime - time;
    time = currentTime;

    const delta = 0.001 * deltaTime;
    if (isAnimationEnabled) {
        if (Array.isArray(meshes)) {
            meshes.forEach((mesh) => {
                mesh.rotation.y += delta;
            })
        } else {
            meshes.rotation.y += delta;
        }
    }

    renderer.render(scene, camera);
    window.requestAnimationFrame(() => tick(meshes));
}
const toggleFullscreen = async () => {
    if(!document.fullscreenElement) {
        await canvas.requestFullscreen();
    } else {
        await document.exitFullscreen();
    }
}
const toggleAnimation = () => {
    isAnimationEnabled = !isAnimationEnabled;
}
const handleKey: EventListener = (event: KeyboardEvent) => {
    if (event.code === 'Enter') {
        toggleFullscreen();
    }
    if (event.code === 'Space') {
        toggleAnimation();
    }
}
const handleResize: EventListener = (event: KeyboardEvent) => {
    size.height = window.innerHeight;
    size.width = window.innerWidth;
    camera.aspect = getAspectRatio();
    camera.updateProjectionMatrix();

    renderer.setSize(size.width, size.height);
    // Дублируем пересчет плотности пикселей,
    // так как если окно переместить на второй Моник с другим разрешением,
    // то неплохо бы обновить отрисовку в новом разрешении
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
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
    // Задаем плотность пикселей, но не более 2
    // Потому что человеческий глаз не поймет разницы если будет плотнее
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    // Добавляем анимацию вращения для всех переданных мешей
    time = Date.now();
    tick([mesh1, mesh2, mesh3])
}

document.addEventListener("DOMContentLoaded", render);
document.addEventListener("keypress", handleKey);
window.addEventListener("resize", handleResize)
