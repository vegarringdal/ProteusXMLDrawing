import { collectMissingParts } from "../utils/findMissing";
import { NumberAttribute } from "../utils/NumberAttribute";

/**
 * Axis orientation
 * The <Axis> value defines a unit vector in 3D space about which an object should rotate.
 * For 2D diagrams nearly all geometries will define this element as <Axis X="0" Y="0" Z="1"/>
 * which denotes a vector aligned with the Z-axis.
 *
 * Inverted z axis (flip around y axis) : <Axis X="0" Y="0" Z="-1"/>
 */
export class Axis {
    isChild = true;
    element: Element;

    // children
    // no children on this element

    // attributes
    x: NumberAttribute;
    y: NumberAttribute;
    z: NumberAttribute;

    constructor(element: Element) {
        this.element = element;

        // children
        // no children on this element

        // attributes
        this.x = new NumberAttribute(element, "X");
        this.y = new NumberAttribute(element, "Y");
        this.z = new NumberAttribute(element, "Z");

        // helper to find missing part   // helper to find missing part
        collectMissingParts(this.element, this);
    }
}
