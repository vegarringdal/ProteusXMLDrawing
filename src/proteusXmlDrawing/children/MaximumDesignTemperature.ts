import { collectMissingParts } from "../utils/findMissing";

export class MaximumDesignTemperature {
    isChild = true;
    element: Element;

    constructor(element: Element) {
        this.element = element;
        collectMissingParts(this.element, this);
    }
}
