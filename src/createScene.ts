import * as GUI from "./gui";
import * as BABYLON from "babylonjs"
import { InputText } from "babylonjs-gui";

const basePath = window.location.pathname.replace(/\/[^/]*$/, "/");
const assets_folder = `${basePath}/assets`;

export function createScene(engine: BABYLON.Engine, canvas: HTMLElement): BABYLON.Scene {
    var scene: BABYLON.Scene = new BABYLON.Scene(engine);

    var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 2, -15), scene);
    camera.attachControl(canvas, true);

    var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 2, segments: 32}, scene);
	var sphere2 = sphere.clone();
	var sphere3 = sphere.clone();
    const hdrTexture = BABYLON.CubeTexture.CreateFromPrefilteredData(`${assets_folder}/sky1.dds`, scene);
    const skybox : BABYLON.AbstractMesh | any = scene.createDefaultSkybox(hdrTexture, true, 10000);

    var probe = new BABYLON.ReflectionProbe("main", 512, scene);
    if (probe.renderList)
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


    // GUI.addLabelToMesh(sphere);
    // const random_color_btn = GUI.createSimpleButton("Click me!");
    // random_color_btn.onPointerClickObservable.add(function() {
    //     metal3.albedoColor = BABYLON.Color3.Random();
    //     metal2.albedoColor = BABYLON.Color3.Random();
    // })
    // GUI.createImageButton("Play", "./assets/play-button.svg")
    // GUI.createTextBlock('Hello, Babylon!', 'white', 40);
    const inputTextBlock = GUI.createInputText('0.1');
    inputTextBlock.onEnterPressedObservable.add(function (value) {
        if (value instanceof InputText)
            console.log(value.text);
    })

    scene.executeWhenReady(() => {
        engine.hideLoadingUI();
    })

    return scene;
}
