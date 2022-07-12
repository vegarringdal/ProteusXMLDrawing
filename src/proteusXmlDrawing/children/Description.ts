import { collectMissingParts } from "../utils/findMissing";

/**
 * A textual description of an item
 */
export class Description {
    isChild = true;
    element: Element;

    // children
    // no children

    // attributes
    // no attributes

    constructor(element: Element) {
        this.element = element;

        // helper to find missing part   // helper to find missing part
        collectMissingParts(this.element, this);
    }
}
