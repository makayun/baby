import { AbstractMesh } from "@babylonjs/core";
import * as GUI from "@babylonjs/gui"

let advancedTexture: GUI.AdvancedDynamicTexture;

// This must be added in the beginning of every function that creates a GUI element!!!
function guiInit(): void {
    if (!advancedTexture) {
        advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("ui1");
    }
}

export function createSimpleButton(text: string) : GUI.Button {
    guiInit();

    const button = GUI.Button.CreateSimpleButton(`${text}_btn`, text);
    button.width = 0.2;
    button.height = '40px';
    button.color = 'white';
    button.background = 'deepskyblue';
    advancedTexture.addControl(button);
    return (button);
}

export function createImageButton(text: string, imageUrl: string) {
    guiInit();

    const button = GUI.Button.CreateImageButton(`${text}_imgbtn`, text, imageUrl);
    button.width = 0.2;
    button.height = 0.04;
    button.color = 'white';
    button.background = 'deepskyblue';
    if (button.image)
        button.image.left = '5%';
    if (button.textBlock != undefined)
        button.textBlock.fontSize = '50%';
    advancedTexture.addControl(button);
    return (button);
}

export function createTextBlock(in_text: string, in_color: string, in_fontSize: number) : GUI.TextBlock {
    guiInit();

    const text_block = new GUI.TextBlock();
    text_block.text = in_text;
    text_block.color = in_color;
    text_block.fontSize = in_fontSize;
    text_block.fontFamily = 'Montserrat Black';
    text_block.shadowColor = '#000';
    text_block.shadowOffsetX = 2;
    text_block.shadowOffsetY = 2;
    advancedTexture.addControl(text_block);

    return (text_block);
}

export function createInputText(in_text?: string) : GUI.InputText {
    guiInit();

    const inputTextBlock = new GUI.InputText(`${in_text}_inputtxt`, in_text);
    inputTextBlock.width = 0.2;
    inputTextBlock.height = '40px';
    inputTextBlock.color = 'black';
    inputTextBlock.background = 'deepskyblue';
    inputTextBlock.focusedBackground = 'white';

    advancedTexture.addControl(inputTextBlock);

    return inputTextBlock;
}

export function createSlider(in_min: number, in_max: number) : GUI.Slider {
    guiInit();

    let slider = new GUI.Slider;
    slider.minimum = in_min;
    slider.maximum = in_max;
    slider.width = 0.2;
    slider.height = '20px';
    slider.value = in_min;
    advancedTexture.addControl(slider);

    return slider;
}

export function createPicker() {
    guiInit();

    const picker = new GUI.ColorPicker;
    advancedTexture.addControl(picker);
    return picker;
}

// export function createCheckbox() {

// }


export function addLabelToMesh(mesh: AbstractMesh): void {
    guiInit();

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

