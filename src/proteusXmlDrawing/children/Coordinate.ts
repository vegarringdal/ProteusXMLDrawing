import { collectMissingParts } from "../utils/findMissing";
import { NumberAttribute } from "../utils/NumberAttribute";

/**
 * A Coordinate element is a Tuple of ordinates denoting a location in the drawing plane.  For 2D drawings the Z ordinates should always be 0
 */
export class Coordinate {
    isChild = true;
    element: Element;

    x: NumberAttribute;
    y: NumberAttribute;
    z: NumberAttribute;

    constructor(element: Element) {
        this.element = element;

        // attibutes
        this.x = new NumberAttribute(element, "X");
        this.y = new NumberAttribute(element, "Y");
        this.z = new NumberAttribute(element, "Z");

        collectMissingParts(this.element, this);
    }
}
