
import { collectMissingParts } from "../utils/findMissing";
import { getElements } from "../utils/getElement";
import { GenericAttributes } from "./GenericAttributes";
import { Label } from "./Label";
import { Component } from "./Component";

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
}
