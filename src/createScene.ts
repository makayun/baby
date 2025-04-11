import type { Scene } from "@babylonjs/core/scene";
import { AbstractEngine } from "@babylonjs/core/Engines/abstractEngine";

import { PongScene } from "./pongScene"

export interface CreateSceneClass {
    createScene: (engine: AbstractEngine, canvas: HTMLCanvasElement) => Promise<Scene>;
    preTasks?: Promise<unknown>[];
}

export interface CreateSceneModule {
    default: CreateSceneClass;
}

export const getSceneModule = (): CreateSceneClass => {
    return new PongScene();
}

