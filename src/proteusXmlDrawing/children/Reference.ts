import { collectMissingParts } from "../utils/findMissing";
import { NumberAttribute } from "../utils/NumberAttribute";

/**
 * The <Reference> element defines what is effectively the rotation about
 * the <Axis> element. When you see the value written as
 * <Reference X="1" Y="0" Z="0"/>
 * it indicates that the X-Axis with which the object’s points are defined
 * use the same X-Axis on the output surface/window
 * with which to orientate – in other words no rotation is
 * required when you have the following paired elements;
 *
 * <Axis X="0" Y="0" Z="1"/>
 * <Reference X="1" Y="0" Z="0"/>
 *
 * Rotation about the origin :
 * <Reference X=”[cosØ]” Y=”[sinØ]” Z=”0” />
 *
 * Where :-
 *
 * [sinØ] – is the sine of the rotation angle
 * [cosØ] – is the cosine of the rotation angle
 * The rotation is measured anti-clockwise
 *
 */
export class Reference {
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
        this.x = new NumberAttribute(element, "X");
        this.y = new NumberAttribute(element, "Y");
        this.z = new NumberAttribute(element, "Z");
        // helper to find missing part
        collectMissingParts(this.element, this);
    }
}
