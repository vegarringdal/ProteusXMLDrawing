import { collectMissingParts } from "../utils/findMissing";

/**
 * String element detailing the model number for a component.
 * sample: <ModelNumber>A485798347-BjiOM-9347</ModelNumber>
 */
export class ModelNumber {
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
