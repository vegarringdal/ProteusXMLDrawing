import { collectMissingParts } from "../utils/findMissing";
import { StringAttribute } from "../utils/StringAttribute";

export class PersistentID {
    isChild = true;
    element: Element;

    // children
    // no children on this element

    // attributes
    identifier: StringAttribute;
    context: StringAttribute;

    constructor(element: Element) {
        this.element = element;

        // children
        // no children

        // attributes
        this.identifier = new StringAttribute(element, "Identifier");
        this.context = new StringAttribute(element, "Context");

        // helper to find missing part   // helper to find missing part
        collectMissingParts(this.element, this);
    }
}
