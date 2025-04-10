// import * as GUI from "./gui";
import * as BABYLON from "babylonjs"
// import { Control } from "babylonjs-gui";
import { ddsAssets } from "./import_assets";
// import { svgAssets } from "./import_assets";

function createBall(scene: BABYLON.Scene, metal: BABYLON.PBRMaterial) : BABYLON.Mesh {
    let ball = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 2, segments: 32}, scene);
    ball.material = metal;
    return ball;
}

function createMetal(scene: BABYLON.Scene, probe: BABYLON.ReflectionProbe) : BABYLON.PBRMaterial {
    let metal = new BABYLON.PBRMaterial('metal', scene);
    metal.reflectionTexture = probe.cubeTexture;
    metal.roughness = 0.25;
    metal.metallic = 1.0;
    metal.realTimeFiltering = true;
    metal.realTimeFilteringQuality = BABYLON.Constants.TEXTURE_FILTERING_QUALITY_HIGH;
}

export function createScene(engine: BABYLON.Engine, canvas: HTMLElement): BABYLON.Scene {
    let scene: BABYLON.Scene = new BABYLON.Scene(engine);

    let camera = new BABYLON.ArcRotateCamera("camera", 1, 1, 15, BABYLON.Vector3.Zero(), scene);
    camera.lowerRadiusLimit = 5;
    camera.attachControl(canvas, true);

    const hdrTexture = BABYLON.CubeTexture.CreateFromPrefilteredData(ddsAssets['sky1'], scene);
    const skybox : BABYLON.AbstractMesh | any = scene.createDefaultSkybox(hdrTexture, true, 10000);

    let probe = new BABYLON.ReflectionProbe("main", 512, scene);
    if (probe.renderList)
        probe.renderList.push(skybox);

    const metal = createMetal(scene, probe);
    const ball = createBall(scene, metal);
    camera.parent = ball;

    scene.executeWhenReady(() => {
        engine.hideLoadingUI();
    })

    return scene;
}
