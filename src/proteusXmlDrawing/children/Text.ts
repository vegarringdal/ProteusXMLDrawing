import { collectMissingParts } from "../utils/findMissing";
import { getElements } from "../utils/getElement";
import { NumberAttribute } from "../utils/NumberAttribute";
import { getPaper } from "../utils/paper";
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
    element: Element;
    isChild = true;

    // children
    presentation: Presentation[];
    extent: Extent[];
    position: Position[];
    strings: String[];
    genericAttributes: GenericAttributes[];

    // attributes
    numLines: NumberAttribute;
    string: StringAttribute;
    font: StringAttribute;
    justification: StringAttribute;
    width: NumberAttribute;
    height: NumberAttribute;
    textAngle: NumberAttribute;
    slantAngle: NumberAttribute;
    itemID: StringAttribute;
    set: StringAttribute;
    dependantAttribute: StringAttribute;

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
        // helper to find missing part
        collectMissingParts(this.element, this);
    }

    /**
     * draw element/children if any primitives
     * @param unit
     * @param pageOriginX
     * @param pageOriginY
     */
    public draw(unit: number, pageOriginX: number, pageOriginY: number, offsetX = 0, offsetY = 0) {
        const PointText = getPaper().PointText;
        const Point = getPaper().Point;
        const x = this.position[0].location[0].x.value * unit;
        const y = pageOriginY * unit - this.position[0].location[0].y.value * unit;
        const text = new PointText(new Point(x, y));

        // height and width attribute just cant be right, need to use extent or a combo?
        const width = (this.extent[0].max[0].x.value - this.extent[0].min[0].x.value) * 1000;
        const height = (this.extent[0].max[0].y.value - this.extent[0].min[0].y.value) * 1000;

        text.content = this.string.value;
        text.fontSize = this.height.value * unit;
        text.fontFamily = this.font.value;

        // todo, I need to adjust text, but looks like PDF and SVG does not render the same..
        // need to render more before and adjustments, also have no rotation made

        text.bounds.y = text.bounds.y + height;

        switch (this.justification.value) {
            case "LeftTop":
                break;
            case "LeftCenter":
                break;
            case "LeftBottom":
                break;
            case "CenterTop":
                break;
            case "CenterCenter":
                break;
            case "CenterBottom":
                break;
            case "RightTop":
                break;
            case "RightCenter":
                break;
            case "RightBottom":
                break;
            default:
            // LeftBottom
        }
    }
}
