import { Engine } from "@babylonjs/core";
import { getSceneModule } from "./createScene";

let engine: Engine;

export const babylonInit = async (): Promise<void> => {
    const createSceneModule = getSceneModule();
    await Promise.all(createSceneModule.preTasks || []);
    const canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;
    engine = new Engine(canvas, true);
    const scene = await createSceneModule.createScene(engine, canvas);

    engine.runRenderLoop(function () {
        scene.render();
    });

    window.addEventListener("resize", function () {
        engine.resize();
    });
};

babylonInit().then(() => {
    engine.displayLoadingUI();
});
