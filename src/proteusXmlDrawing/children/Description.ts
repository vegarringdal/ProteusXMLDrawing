import { collectMissingParts } from "../utils/findMissing";

/**
 * A textual description of an item
 */
export class Description {
    isChild = true;
    element: Element;

    // no children

    // no attributes

    constructor(element: Element) {
        this.element = element;

        collectMissingParts(this.element, this);
    }
}
