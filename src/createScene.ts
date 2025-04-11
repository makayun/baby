// import * as GUI from "./gui";
import * as BABYLON from "babylonjs"
// import { Control } from "babylonjs-gui";
import { ddsAssets, pngAssets, svgAssets } from "./import_assets";

function createBall(scene: BABYLON.Scene, metal?: BABYLON.PBRMaterial) : BABYLON.Mesh {
    let ball = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 2, segments: 32}, scene);
    if (metal)
    ball.material = metal;
    return ball;
}

function createMetal(scene: BABYLON.Scene, probe?: BABYLON.ReflectionProbe) : BABYLON.PBRMaterial {
    let metal = new BABYLON.PBRMaterial('metal', scene);
    if (probe)
        metal.reflectionTexture = probe.cubeTexture;
    metal.roughness = 0.25;
    metal.metallic = 1.0;
    metal.realTimeFiltering = true;
    metal.realTimeFilteringQuality = BABYLON.Constants.TEXTURE_FILTERING_QUALITY_HIGH;
    return metal;
}


export function createScene(engine: BABYLON.Engine, canvas: HTMLElement): BABYLON.Scene {
    let scene: BABYLON.Scene = new BABYLON.Scene(engine);
    var gravityVector = new BABYLON.Vector3(0,-9.81, 0);
    var physicsPlugin = new BABYLON.CannonJSPlugin();
    scene.enablePhysics(gravityVector, physicsPlugin);


    const light = new BABYLON.HemisphericLight("light", BABYLON.Vector3.Zero(), scene);

    let camera = new BABYLON.ArcRotateCamera("camera", 1, 1, 30, BABYLON.Vector3.Zero(), scene);
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
    light.parent = ball;
    const beh = new BABYLON.BouncingBehavior;
    ball.addBehavior(beh);
    ball.position.y = 5;

    var groundSize = 50;
    var groundMaxHeight = 2;

    // Our built-in 'ground' shape.
    var ground = BABYLON.MeshBuilder.CreateGroundFromHeightMap("ground", pngAssets["height_map"], {
        width: groundSize,
        height: groundSize,
        maxHeight: groundMaxHeight,
        subdivisions: 100
    })

    let gag: BABYLON.PhysicsAggregate;
    let sag: BABYLON.PhysicsAggregate;

    scene.executeWhenReady(() => {
        engine.hideLoadingUI();
        gag = new BABYLON.PhysicsAggregate(ground, BABYLON.PhysicsShapeType.MESH, {mass: 0}, scene);
        sag = new BABYLON.PhysicsAggregate(ball, BABYLON.PhysicsShapeType.BOX, {mass: 1}, scene);

    })

    return scene;
}
