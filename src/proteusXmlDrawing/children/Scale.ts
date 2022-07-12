import { collectMissingParts } from "../utils/findMissing";
import { NumberAttribute } from "../utils/NumberAttribute";

export class Scale {
    isChild = true;
    element: Element;

    // children
    // no children on this element

    // attributes
    x: NumberAttribute;
    y: NumberAttribute;
    z: NumberAttribute;

    constructor(element: Element) {
        this.element = element;
        this.x = new NumberAttribute(element, "X");
        this.y = new NumberAttribute(element, "Y");
        this.z = new NumberAttribute(element, "Z");
        // helper to find missing part
        collectMissingParts(this.element, this);
    }
}
