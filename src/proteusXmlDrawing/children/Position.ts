import { getElements } from "../utils/getElement";
import { Axis } from "./Axis";
import { Reference } from "./Reference";
import { Location } from "./Location";

/**
 * Usually defaulted to 0,0,0 if output.
 */
export class Position {
    public readonly isChild = true;
    public readonly element: Element;


    // children
    public readonly location: Location[];
    public readonly axis: Axis[];
    public readonly reference: Reference[];

    // attributes
    // no attributes for this element

    constructor(element: Element) {
        this.element = element;
        this.location = getElements(element, "Location", Location);
        this.axis = getElements(element, "Axis", Axis);
        this.reference = getElements(element, "Reference", Reference);
    }

 
}
