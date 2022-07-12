import { collectMissingParts } from "../utils/findMissing";
import { getElements } from "../utils/getElement";
import { Max } from "./Max";
import { Min } from "./Min";

/**
 * The minimum bounding rectangle that encloses the full graphical contents of the PlantModel instance.
 * The Extent element must be the second child element of a PlantModel element
 */
export class Extent {
    isChild = true;
    element: Element;

    // children
    max: Max[];
    min: Min[];

    // attributes
    // no attributes for this element

    constructor(element: Element) {
        this.element = element;
        // not implemented
        this.min = getElements(element, "Min", Min);
        this.max = getElements(element, "Max", Max);

        // helper to find missing part   // helper to find missing part
        collectMissingParts(this.element, this);
    }
}
