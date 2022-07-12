import { collectMissingParts } from "../utils/findMissing";
import { NumberAttribute } from "../utils/NumberAttribute";

export class Max {
    isChild = true;
    element: Element;

    x: NumberAttribute;
    y: NumberAttribute;
    z: NumberAttribute;

    constructor(element: Element) {
        this.element = element;
        this.x = new NumberAttribute(element, "X");
        this.y = new NumberAttribute(element, "Y");
        this.z = new NumberAttribute(element, "Z");

        collectMissingParts(this.element, this);
    }
}
