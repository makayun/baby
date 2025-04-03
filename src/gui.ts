import { AbstractMesh } from "babylonjs";
import * as GUI from "babylonjs-gui"

let advancedTexture: GUI.AdvancedDynamicTexture;

function init(): void {
    if (!advancedTexture) {
        advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("ui1");
    }
}

export function createSimpleButton(name: string, text: string) : GUI.Button {
    if (!advancedTexture)
        init();

    const button = GUI.Button.CreateSimpleButton(name, text);
    button.width = '200px';
    button.height = '40px';
    button.color = 'white';
    button.background = 'deepskyblue';
    advancedTexture.addControl(button);
    return (button);
}

export function createImageButton(name: string, text: string, imageUrl: string ) {
    if (!advancedTexture)
        init();

    const button = GUI.Button.CreateImageButton(name, text, imageUrl);
    button.width = '200px';
    button.height = '40px';
    button.color = 'white';
    button.background = 'deepskyblue';
    if (button.image)
        button.image.left = '30px';
    advancedTexture.addControl(button);
    return (button);
}



export function addLabelToMesh(mesh: AbstractMesh): void {
    if (!advancedTexture) {
        init();
    }
    let label: GUI.Rectangle = new GUI.Rectangle("label for " + mesh.name);
    label.background = "black";
    label.height = "30px";
    label.alpha = 0.5;
    label.width = "100px";
    label.cornerRadius = 20;
    label.thickness = 1;
    label.linkOffsetY = 30;
    label.top = "10%";
    label.zIndex = 5;
    label.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
    advancedTexture.addControl(label);

    const text1: GUI.TextBlock = new GUI.TextBlock();
    text1.text = mesh.name;
    text1.color = "white";
    label.addControl(text1);
}

