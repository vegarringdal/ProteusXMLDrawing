import { NumberAttribute } from "../utils/NumberAttribute";

export class Min {
    public readonly isChild = true;
    public readonly element: Element;

    // children
    // no children on this element

    // attributes
    public readonly x: NumberAttribute;
    public readonly y: NumberAttribute;
    public readonly z: NumberAttribute;

    constructor(element: Element) {
        this.element = element;
        this.x = new NumberAttribute(element, "X");
        this.y = new NumberAttribute(element, "Y");
        this.z = new NumberAttribute(element, "Z");
    }
}
