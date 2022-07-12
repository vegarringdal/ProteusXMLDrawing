import { collectMissingParts } from "../utils/findMissing";

/**
 * The name of the Material used to construct the item
 * sample: <Material>Copper</Material>
 */
export class Material {
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
