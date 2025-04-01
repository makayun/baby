
import * as BABYLON from "babylonjs"

var canvas = document.getElementById("renderCanvas");

var startRenderLoop = function (engine, canvas) {
	engine.runRenderLoop(function () {
		if (sceneToRender && sceneToRender.activeCamera) {
			sceneToRender.render();
		}
	});
}

var engine = null;
var scene = null;
var sceneToRender = null;
var createDefaultEngine = function() { return new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true,  disableWebGL2Support: false}); };
class Playground {
static CreateScene(engine, canvas) {
// This creates a basic Babylon Scene object (non-mesh)
const scene = new BABYLON.Scene(engine);
/**** Set camera and light *****/
var camera = new BABYLON.ArcRotateCamera("camera", BABYLON.Tools.ToRadians(160), BABYLON.Tools.ToRadians(57), 10, BABYLON.Vector3.Zero(), scene);
camera.attachControl(canvas, true);
const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0));
const groundMat = new BABYLON.StandardMaterial("grass");
groundMat.diffuseColor = BABYLON.Color3.Green();
// var box2 = box.clone();
// box2.position.y = 2;
// box2.scaling = new BABYLON.Vector3(1, 1.5, 1);
// box2.rotation.y = BABYLON.Tools.ToRadians(90);
const ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 10, height: 10 });
ground.material = groundMat;
const house_w = 1;
const houses = [];
for (let i = 0; i < 4; i++) {
houses.push(new House(house_w, 1, i * house_w, 0));
}
return scene;
}
}
class House {
constructor(w, h, x, z) {
const roofMat = new BABYLON.StandardMaterial("roofMat");
roofMat.diffuseTexture = new BABYLON.Texture("https://assets.babylonjs.com/environments/roof.jpg");
const boxMat = new BABYLON.StandardMaterial("boxMat");
boxMat.diffuseTexture = new BABYLON.Texture("https://assets.babylonjs.com/environments/cubehouse.png");
const faceUV = [];
faceUV[0] = new BABYLON.Vector4(0.5, 0.0, 0.75, 1.0); //rear face
faceUV[1] = new BABYLON.Vector4(0.0, 0.0, 0.25, 1.0); //front face
faceUV[2] = new BABYLON.Vector4(0.25, 0, 0.5, 1.0); //right side
faceUV[3] = new BABYLON.Vector4(0.75, 0, 1.0, 1.0); //left side
const box = BABYLON.MeshBuilder.CreateBox("box", { height: h, width: w, faceUV: faceUV, wrap: true });
box.position = new BABYLON.Vector3(x, h * 0.5, z);
const roof = BABYLON.MeshBuilder.CreateCylinder("roof", { diameter: 1.3, height: w, tessellation: 3, });
roof.scaling.x = 0.75;
roof.rotation.z = Math.PI / 2;
roof.position = new BABYLON.Vector3(x, h + 0.24, z);
box.material = boxMat;
roof.material = roofMat;
}
}
createScene = function() { return Playground.CreateScene(engine, engine.getRenderingCanvas()); }
window.initFunction = async function() {



var asyncEngineCreation = async function() {
	try {
	return createDefaultEngine();
	} catch(e) {
	console.log("the available createEngine function failed. Creating the default engine instead");
	return createDefaultEngine();
	}
}

window.engine = await asyncEngineCreation();


if (!engine) throw 'engine should not be null.';
startRenderLoop(engine, canvas);
window.scene = createScene();};
initFunction().then(() => {sceneToRender = scene
});

// Resize
window.addEventListener("resize", function () {
	engine.resize();
});
