import { collectMissingParts } from "../utils/findMissing";

/**
 * The name of the Material used to construct the item
 * sample: <Material>Copper</Material>
 */
export class Material {
    isChild = true;
    element: Element;

    // nome

    constructor(element: Element) {
        this.element = element;

        collectMissingParts(this.element, this);
    }
}
