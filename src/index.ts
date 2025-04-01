import { Engine, Scene, ArcRotateCamera, HemisphericLight, MeshBuilder, Vector3 } from "babylonjs";

const canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;
const engine = new Engine(canvas, true);
const scene = new Scene(engine);
const camera = new ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 4, 10, Vector3.Zero(), scene);
camera.attachControl(canvas, true);

const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
const sphere = MeshBuilder.CreateSphere("sphere", { diameter: 2 }, scene);

engine.runRenderLoop(() => {
    scene.render();
});

window.addEventListener("resize", () => {
    engine.resize();
});
