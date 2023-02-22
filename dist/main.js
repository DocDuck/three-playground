"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const THREE = __importStar(require("three"));
const size = {
    width: 800,
    height: 600
};
const render = function () {
    // забираем дом узел канваса
    const canvas = document.querySelector('#root');
    if (!canvas)
        return;
    const scene = new THREE.Scene();
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 'cyan' });
    // создаем меш (каркас фигуры) из геометрии и материала
    const mesh = new THREE.Mesh(geometry, material);
    // добавляем фигуру на сцену
    scene.add(mesh);
    // дальше добавляем камеру
    const camera = new THREE.PerspectiveCamera(75, size.width / size.height);
    scene.add(camera);
    // добавляем канвас в редерер WebGL
    const renderer = new THREE.WebGLRenderer({ canvas });
};
document.addEventListener("DOMContentLoaded", render);
