import { BsplineCurve } from "./BsplineCurve";
import { Circle } from "./Circle";
import { CompositeCurve } from "./CompositeCurve";
import { Ellipse } from "./Ellipse";
import { Extent } from "./Extent";
import { GenericAttributes } from "./GenericAttributes";
import { Line } from "./Line";
import { PolyLine } from "./PolyLine";
import { Presentation } from "./Presentation";
import { Shape } from "./Shape";
import { TrimmedCurve } from "./TrimmedCurve";
import { Text } from "./Text";
import { StringAttribute } from "../utils/StringAttribute";
import { getElements } from "../utils/getElement";
import { getDrawable } from "../utils/callDrawOnChildren";
import { collectMissingParts } from "../utils/findMissing";

/**
 * A geometric primitive
 */
export class DrawingBorder {
    isChild = true;
    element: Element;

    // children
    presentation: Presentation[];
    extent: Extent[];
    bsplineCurve: BsplineCurve[];
    circle: Circle[];
    compositeCurve: CompositeCurve[];
    line: Line[];
    ellipse: Ellipse[];
    polyLine: PolyLine[];
    shape: Shape[];
    trimmedCurve: TrimmedCurve[];
    text: Text[];
    genericAttributes: GenericAttributes[];

    // attributes
    name: StringAttribute;
    size: StringAttribute;

    constructor(element: Element) {
        this.element = element;

        // children
        this.presentation = getElements(element, "Presentation", Presentation);
        this.extent = getElements(element, "Extent", Extent);
        this.bsplineCurve = getElements(element, "BsplineCurve", BsplineCurve);
        this.circle = getElements(element, "Circle", Circle);
        this.compositeCurve = getElements(element, "CompositeCurve", CompositeCurve);
        this.line = getElements(element, "Line", Line);
        this.ellipse = getElements(element, "Ellipse", Ellipse);
        this.polyLine = getElements(element, "PolyLine", PolyLine);
        this.shape = getElements(element, "Shape", Shape);
        this.trimmedCurve = getElements(element, "TrimmedCurve", TrimmedCurve);
        this.text = getElements(element, "Text", Text);
        this.genericAttributes = getElements(element, "GenericAttributes", GenericAttributes);

        // attributes
        this.name = new StringAttribute(element, "Name");
        this.size = new StringAttribute(element, "Size");

        // helper to find missing part   // helper to find missing part
        collectMissingParts(this.element, this);
    }

    /**
     * draw element/children if any primitives
     * @param unit
     * @param pageOriginX
     * @param pageOriginY
     */
    public draw(unit: number, pageOriginX: number, pageOriginY: number, offsetX = 0, offsetY = 0) {
        const drawables = getDrawable(this);
        drawables.forEach((drawable) => {
            drawable.draw(unit, pageOriginX, pageOriginY, offsetX, offsetY);
        });
    }
}
