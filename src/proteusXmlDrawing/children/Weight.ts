import { collectMissingParts } from "../utils/findMissing";
import { NumberAttribute } from "../utils/NumberAttribute";
import { StringAttribute } from "../utils/StringAttribute";

/**
 * The weight of the item.
 */
export class Weight {
    public readonly isChild = true;
    public readonly element: Element;

    // children
    // no children on this element

    // attributes
    public readonly value: StringAttribute;
    public readonly units: StringAttribute;

    constructor(element: Element) {
        this.element = element;
        this.value = new StringAttribute(element, "Value");
        this.units = new StringAttribute(element, "Units");
        // helper to find missing part
        collectMissingParts(this.element, this);
    }
}
