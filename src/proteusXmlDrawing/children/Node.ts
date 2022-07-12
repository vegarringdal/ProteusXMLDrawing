import { collectMissingParts } from "../utils/findMissing";
import { getElements } from "../utils/getElement";
import { GenericAttributes } from "./GenericAttributes";
import { Position } from "./Position";

export class Node {
    isChild = true;
    element: Element;
    position: Position[];
    genericAttributes: GenericAttributes[];

    constructor(element: Element) {
        this.element = element;

        this.genericAttributes = getElements(element, "GenericAttributes", GenericAttributes);
        this.position = getElements(element, "GenericAttributes", Position);

        collectMissingParts(this.element, this);
    }
}
