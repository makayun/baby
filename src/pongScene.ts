import { Scene } from "@babylonjs/core";
import { ArcRotateCamera } from "@babylonjs/core";
import { Color3, CubeTexture } from "@babylonjs/core";
import { AbstractMesh } from "@babylonjs/core";
import { ReflectionProbe } from "@babylonjs/core";
import { PBRMaterial } from "@babylonjs/core";
import { Constants } from "@babylonjs/core";
import { Matrix } from "@babylonjs/core";
import * as GUI from "./gui"
import { Vector3 } from "@babylonjs/core";
// import { Quaternion } from "@babylonjs/core";
import { HemisphericLight } from "@babylonjs/core";
import { CreateSphere } from "@babylonjs/core";
// import { CreateGround } from "@babylonjs/core/Meshes/Builders/groundBuilder";
// import "@babylonjs/core/Physics/physicsEngineComponent";
// import "@babylonjs/core/Materials/standardMaterial";
import { CreateSceneClass } from "./createScene";
// import { havokModule } from "./externals/havok";
// import { PhysicsShapeBox, PhysicsShapeSphere } from "@babylonjs/core/Physics/v2/physicsShape";
// import { PhysicsBody } from "@babylonjs/core/Physics/v2/physicsBody";
// import { PhysicsMotionType } from "@babylonjs/core/Physics/v2/IPhysicsEnginePlugin";
// import { HavokPlugin } from "@babylonjs/core/Physics/v2/Plugins/havokPlugin";
import { AbstractEngine } from "@babylonjs/core/Engines/abstractEngine";
import { ddsAssets } from "./import_assets";

export class PongScene implements CreateSceneClass {
	// preTasks = [havokModule];

	createScene = async (engine: AbstractEngine, canvas: HTMLCanvasElement): Promise<Scene> => {
		let scene: Scene = new Scene(engine);

		const camera = new ArcRotateCamera("my first camera", 0, Math.PI / 3, 10, new Vector3(0, 0, 0), scene);
		camera.setTarget(Vector3.Zero());
		camera.attachControl(canvas, true);

		const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
		light.intensity = 0.7;

		let sphere = CreateSphere("sphere", {diameter: 2, segments: 32}, scene);
		let sphere2 = sphere.clone();
		let sphere3 = sphere.clone();

		const hdrTexture = CubeTexture.CreateFromPrefilteredData(ddsAssets['sky1'], scene);
		const skybox : AbstractMesh | any = scene.createDefaultSkybox(hdrTexture, true, 10000);

		let probe = new ReflectionProbe("main", 512, scene);
		if (probe.renderList)
			probe.renderList.push(sphere2, sphere3, skybox);

		let metal = new PBRMaterial('metal', scene);
		metal.reflectionTexture = probe.cubeTexture;
		metal.roughness = 0.25;
		metal.metallic = 1.0;
		metal.realTimeFiltering = true;
		metal.realTimeFilteringQuality = Constants.TEXTURE_FILTERING_QUALITY_HIGH;
		sphere.material = metal;

		sphere2.setPivotMatrix(Matrix.Translation(3, 3, 0), false);
		let metal2 = new PBRMaterial('metal', scene);
		metal2.albedoColor = Color3.Magenta();
		metal2.roughness = 0.1;
		metal2.metallic = 0.0;
		sphere2.material = metal2;

		sphere3.setPivotMatrix(Matrix.Translation(6, 1, 0), false);
		// sphere3.material = new BABYLON.PBRMaterial('metal', scene);
		// (sphere3.material as BABYLON.PBRMaterial).roughness = 0.1;
		// (sphere3.material as BABYLON.PBRMaterial).metallic = 0.3;
		// (sphere3.material as BABYLON.PBRMaterial).albedoColor = new BABYLON.Color3(0.3, 0.0, 0.8);
		let metal3 = new PBRMaterial('metal', scene);
		metal3.roughness = 0.1;
		metal3.metallic = 0.3;
		metal3.albedoColor = new Color3(0.3, 0.0, 0.8);
		sphere3.material = metal3;

		scene.registerBeforeRender(function () {
			sphere2.rotation.y += 0.01;
			sphere3.rotation.y += 0.01;
		})


		// GUI.addLabelToMesh(sphere);
		const random_color_btn = GUI.createSimpleButton("Click me!");
		random_color_btn.onPointerClickObservable.add(function() {
			metal3.albedoColor = Color3.Random();
			metal2.albedoColor = Color3.Random();
		})
		// GUI.createImageButton("Play", "./assets/play-button.svg")
		// GUI.createImageButton("Play", plyBtn);
		// GUI.createTextBlock('Hello, Babylon!', 'white', 40);
		// const inputTextBlock = GUI.createInputText('0.1');
		// inputTextBlock.onEnterPressedObservable.add(function (value) {
		//     if (value instanceof InputText)
		//         console.log(value.text);
		// })
		// const slider = GUI.createSlider(0, 3);
		// slider.onValueChangedObservable.add(function (value) {
		//     sphere.position.z = value;
		// })
		// const picker = GUI.createPicker();
		// picker.onValueChangedObservable.add(function (value) {
		//     metal2.albedoColor.copyFrom(value);
		// })

		scene.executeWhenReady(() => {
			engine.hideLoadingUI();
		})

		return scene;
	}
}
