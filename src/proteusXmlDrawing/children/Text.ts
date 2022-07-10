import { getElements } from "../utils/getElement";
import { NumberAttribute } from "../utils/NumberAttribute";
import { StringAttribute } from "../utils/StringAttribute";
import { Extent } from "./Extent";
import { GenericAttributes } from "./GenericAttributes";
import { Position } from "./Position";
import { Presentation } from "./Presentation";
import { String } from "./String";

/**
 * Label primitives
 */
export class Text {
    public readonly element: Element;
    public readonly isChild = true;

    // children
    public readonly presentation: Presentation[];
    public readonly extent: Extent[];
    public readonly position: unknown[];
    public readonly strings: String[];
    public readonly genericAttributes: unknown[];

    // attributes
    public readonly numLines: NumberAttribute;
    public readonly string: StringAttribute;
    public readonly font: StringAttribute;
    public readonly justification: StringAttribute;
    public readonly width: NumberAttribute;
    public readonly height: NumberAttribute;
    public readonly textAngle: NumberAttribute;
    public readonly slantAngle: NumberAttribute;
    public readonly itemID: StringAttribute;
    public readonly set: StringAttribute;
    public readonly dependantAttribute: StringAttribute;

    constructor(element: Element) {
        this.element = element;

        // children
        this.presentation = getElements(element, "Presentation", Presentation);
        this.extent = getElements(element, "Extent", Extent);
        this.position = getElements(element, "Position", Position);
        this.strings = getElements(element, "String", String);
        this.genericAttributes = getElements(element, "GenericAttributes", GenericAttributes);

        // attributes
        this.numLines = new NumberAttribute(element, "NumLines");
        this.string = new StringAttribute(element, "String");
        this.font = new StringAttribute(element, "Font");
        this.justification = new StringAttribute(element, "Justification");
        this.width = new NumberAttribute(element, "Width");
        this.height = new NumberAttribute(element, "Height");
        this.textAngle = new NumberAttribute(element, "TextAngle");
        this.slantAngle = new NumberAttribute(element, "SlantAngle");
        this.itemID = new StringAttribute(element, "ItemID");
        this.set = new StringAttribute(element, "Set");
        this.dependantAttribute = new StringAttribute(element, "DependantAttribute");
    }

    /**
     * draw element/children if any primitives
     * @param unit
     * @param pageOriginX
     * @param pageOriginY
     */
    public draw(unit: number, pageOriginX: number, pageOriginY: number) {
        // not implemented
        // not every element will have primitives or children
    }
}
