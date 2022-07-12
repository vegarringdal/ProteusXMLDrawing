import { getElements } from "../utils/getElement";
import { NumberAttribute } from "../utils/NumberAttribute";
import { StringAttribute } from "../utils/StringAttribute";
import { Coordinate } from "./Coordinate";
import { Extent } from "./Extent";
import { GenericAttributes } from "./GenericAttributes";
import { Presentation } from "./Presentation";

/**
 * The representation of a piece of plant equipment
 */
export class Ellipse {
    public readonly isChild = true;
    public readonly element: Element;

    // children
    public readonly presentation: Presentation[];
    public readonly extent: Extent[];
    public readonly coordinate: Coordinate[];
    public readonly genericAttributes: GenericAttributes[];

    // attributes
    public readonly primaryAxis: NumberAttribute;
    public readonly secondaryAxis: NumberAttribute;
    public readonly filled: StringAttribute;

    constructor(element: Element) {
        this.element = element;

        // children
        this.presentation = getElements(element, "Presentation", Presentation);
        this.extent = getElements(element, "Extent", Extent);
        this.coordinate = getElements(element, "Coordinate", Coordinate);
        this.genericAttributes = getElements(element, "GenericAttributes", GenericAttributes);

        // attributes
        this.primaryAxis = new NumberAttribute(element, "PrimaryAxis");
        this.secondaryAxis = new NumberAttribute(element, "SecondaryAxis");
        this.filled = new StringAttribute(element, "Filled");
    }

    /**
     * draw element/children if any primitives
     * @param unit
     * @param pageOriginX
     * @param pageOriginY
     */
    public draw(unit: number, pageOriginX: number, pageOriginY: number, offsetX = 0, offsetY = 0) {
        // not implemented
        // not every element will have primitives or children
    }
}
