import * as BABYLON from "babylonjs";

const canvas = document.getElementById("renderCanvas") as HTMLCanvasElement | null;

if (!canvas) {
    throw new Error("Canvas element not found!");
}

const engine = new BABYLON.Engine(canvas, true);

const scene: BABYLON.Scene = new BABYLON.Scene(engine);

engine.runRenderLoop(() => {
	scene.render();
});
