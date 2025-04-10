import { AbstractMesh } from "babylonjs";
import * as GUI from "babylonjs-gui";
export declare function createSimpleButton(text: string, onClick?: () => void): GUI.Button;
export declare function createImageButton(text: string, imageUrl: string, onClick?: () => void): GUI.Button;
export declare function createTextBlock(in_text: string, in_color: string, in_fontSize: number): GUI.TextBlock;
export declare function createInputText(in_text?: string, events?: {
    onEnterPressed?: (value: string) => void;
    onTextChanged?: (value: string) => void;
    onFocus?: () => void;
    onBlur?: () => void;
}): GUI.InputText;
export declare function createSlider(in_min: number, in_max: number): GUI.Slider;
export declare function createPicker(): GUI.ColorPicker;
export declare function createCheckbox(): GUI.Checkbox;
export declare function addLabelToMesh(mesh: AbstractMesh): GUI.Rectangle;
//# sourceMappingURL=gui.d.ts.map