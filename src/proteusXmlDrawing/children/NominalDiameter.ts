import { collectMissingParts } from "../utils/findMissing";

export class NominalDiameter {
    isChild = true;
    element: Element;

    constructor(element: Element) {
        this.element = element;
        collectMissingParts(this.element, this);
    }
}
