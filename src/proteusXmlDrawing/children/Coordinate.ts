import { NumberAttribute } from "../utils/NumberAttribute";

/**
 * A Coordinate element is a Tuple of ordinates denoting a location in the drawing plane.  For 2D drawings the Z ordinates should always be 0
 */
export class Coordinate {
    public readonly isChild = true;

    // children
    // no children on this element

    // attributes
    public readonly x: NumberAttribute;
    public readonly y: NumberAttribute;
    public readonly z: NumberAttribute;

    constructor(element: Element) {
        this.x = new NumberAttribute(element, "X");
        this.y = new NumberAttribute(element, "Y");
        this.z = new NumberAttribute(element, "Z");
    }
}
