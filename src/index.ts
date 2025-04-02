import { Engine, Scene, ArcRotateCamera, HemisphericLight, Vector3, MeshBuilder, Mesh } from "babylonjs";
import { addLabelToMesh } from "./gui";
import * as BABYLON from "babylonjs"

var canvas: any = document.getElementById("renderCanvas");
var engine: Engine = new Engine(canvas, true);

function createScene(): Scene {
    var scene: Scene = new Scene(engine);

    var camera: ArcRotateCamera = new ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, Vector3.Zero(), scene);
    camera.attachControl(canvas, true);

    var sphere = MeshBuilder.CreateSphere("sphere", {diameter: 2, segments: 32}, scene);
    var sphere2 = MeshBuilder.CreateSphere("sphere2", {diameter: 2, segments: 32}, scene);
    var sphere3 = MeshBuilder.CreateSphere("sphere3", {diameter: 2, segments: 32}, scene);
    const hdrTexture = BABYLON.CubeTexture.CreateFromPrefilteredData("../assets/sky2.dds", scene);
    const skybox = scene.createDefaultSkybox(hdrTexture, true, 10000);

    var probe = new BABYLON.ReflectionProbe("main", 512, scene);
    probe.renderList.push(sphere2, sphere3, skybox);

    var metal = new BABYLON.PBRMaterial('metal', scene);
    metal.reflectionTexture = probe.cubeTexture;
    metal.roughness = 0.25;
    metal.metallic = 1.0;
    metal.realTimeFiltering = true;
    metal.realTimeFilteringQuality = BABYLON.Constants.TEXTURE_FILTERING_QUALITY_HIGH;
    sphere.material = metal;

    sphere2.setPivotMatrix(BABYLON.Matrix.Translation(3, 3, 0), false);
    var metal2 = new BABYLON.PBRMaterial('metal', scene);
    metal2.albedoColor = BABYLON.Color3.Magenta();
    metal2.roughness = 0.1;
    metal2.metallic = 0.0;
    sphere2.material = metal2;

    sphere3.setPivotMatrix(BABYLON.Matrix.Translation(6, 1, 0), false);
    var metal3 = new BABYLON.PBRMaterial('metal', scene);
    metal3.roughness = 0.1;
    metal3.metallic = 0.3;
    metal3.albedoColor = new BABYLON.Color3(0.3, 0.0, 0.8);
    sphere3.material = metal3;

    scene.registerBeforeRender(function () {
        sphere2.rotation.y += 0.01;
        sphere3.rotation.y += 0.01;
    })


    addLabelToMesh(sphere);


    return scene;
}

var scene: Scene = createScene();

engine.runRenderLoop(() => {
    scene.render();
});

window.addEventListener("resize", () => {
    engine.resize();
});
