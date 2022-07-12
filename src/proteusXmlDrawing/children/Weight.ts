import { collectMissingParts } from "../utils/findMissing";
import { NumberAttribute } from "../utils/NumberAttribute";
import { StringAttribute } from "../utils/StringAttribute";

/**
 * The weight of the item.
 */
export class Weight {
    isChild = true;
    element: Element;

    // children
    // no children on this element

    // attributes
    value: StringAttribute;
    units: StringAttribute;

    constructor(element: Element) {
        this.element = element;
        this.value = new StringAttribute(element, "Value");
        this.units = new StringAttribute(element, "Units");
        // helper to find missing part
        collectMissingParts(this.element, this);
    }
}
