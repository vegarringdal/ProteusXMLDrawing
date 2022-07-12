import { collectMissingParts } from "../utils/findMissing";

/**
 * A description of the material relating to an item
 * sample: <MaterialDescription>Some descriptive text</MaterialDescription>
 */
export class MaterialDescription {
    isChild = true;
    element: Element;

    // nome

    constructor(element: Element) {
        this.element = element;

        collectMissingParts(this.element, this);
    }
}
