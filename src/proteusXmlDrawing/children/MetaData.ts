import { collectMissingParts } from "../utils/findMissing";
import { getElements } from "../utils/getElement";
import { GenericAttributes } from "./GenericAttributes";
import { Label } from "./Label";
import { Component } from "./Component";
import { getDrawable } from "../utils/callDrawOnChildren";

export class MetaData {
    isChild = true;
    element: Element;
    genericAttributes: GenericAttributes[];
    label: Label[];
    component: Component[];

    constructor(element: Element) {
        this.element = element;
        this.genericAttributes = getElements(element, "GenericAttributes", GenericAttributes);
        this.label = getElements(element, "Label", Label);
        this.component = getElements(element, "Component", Component);
        collectMissingParts(this.element, this);
    }

    public draw(unit: number, pageOriginX: number, pageOriginY: number, offsetX = 0, offsetY = 0) {
        const drawables = getDrawable(this);
        drawables.forEach((drawable) => {
            drawable.draw(unit, pageOriginX, pageOriginY, offsetX, offsetY);
        });
    }
}
