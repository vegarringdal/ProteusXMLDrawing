import { getElements } from "../utils/getElement";
import { Axis } from "./Axis";
import { Reference } from "./Reference";
import { Location } from "./Location";
import { collectMissingParts } from "../utils/findMissing";

/**
 * Usually defaulted to 0,0,0 if output.
 */
export class Position {
    isChild = true;
    element: Element;

    location: Location[];
    axis: Axis[];
    reference: Reference[];

    // no attributes for this element

    constructor(element: Element) {
        this.element = element;
        this.location = getElements(element, "Location", Location);
        this.axis = getElements(element, "Axis", Axis);
        this.reference = getElements(element, "Reference", Reference);

        collectMissingParts(this.element, this);
    }
}
