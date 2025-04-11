import type { Scene } from "@babylonjs/core/scene";
import { AbstractEngine } from "@babylonjs/core/Engines/abstractEngine";
export interface CreateSceneClass {
    createScene: (engine: AbstractEngine, canvas: HTMLCanvasElement) => Promise<Scene>;
    preTasks?: Promise<unknown>[];
}
export interface CreateSceneModule {
    default: CreateSceneClass;
}
export declare const getSceneModule: () => CreateSceneClass;
//# sourceMappingURL=createScene.d.ts.map