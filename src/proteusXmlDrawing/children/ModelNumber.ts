import { collectMissingParts } from "../utils/findMissing";

/**
 * String element detailing the model number for a component.
 * sample: <ModelNumber>A485798347-BjiOM-9347</ModelNumber>
 */
export class ModelNumber {
    isChild = true;
    element: Element;

    // nome

    constructor(element: Element) {
        this.element = element;

        collectMissingParts(this.element, this);
    }
}
