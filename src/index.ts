import { Engine, Scene } from "babylonjs";
import { createScene } from "./createScene"

var canvas: any = document.getElementById("renderCanvas");
var engine: Engine = new Engine(canvas, true);

engine.displayLoadingUI();

var scene: Scene = createScene(engine, canvas);

engine.runRenderLoop(() => {
    scene.render();
});

window.addEventListener("resize", () => {
    engine.resize();
});
