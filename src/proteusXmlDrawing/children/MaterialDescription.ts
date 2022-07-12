import { collectMissingParts } from "../utils/findMissing";

/**
 * A description of the material relating to an item
 * sample: <MaterialDescription>Some descriptive text</MaterialDescription>
 */
export class MaterialDescription {
    isChild = true;
    element: Element;

    // children
    // nome

    // attributes
    // none

    constructor(element: Element) {
        this.element = element;

        // helper to find missing part   // helper to find missing part
        collectMissingParts(this.element, this);
    }
}
