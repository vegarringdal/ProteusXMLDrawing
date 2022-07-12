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

/**
 * A geometric primitive
 */
export class DrawingBorder {
    public readonly isChild = true;
    public readonly element: Element;

    // children
    public readonly presentation: Presentation[];
    public readonly extent: Extent[];
    public readonly bsplineCurve: BsplineCurve[];
    public readonly circle: Circle[];
    public readonly compositeCurve: CompositeCurve[];
    public readonly line: Line[];
    public readonly ellipse: Ellipse[];
    public readonly polyLine: PolyLine[];
    public readonly shape: Shape[];
    public readonly trimmedCurve: TrimmedCurve[];
    public readonly text: Text[];
    public readonly genericAttributes: GenericAttributes[];

    // attributes
    public readonly name: StringAttribute;
    public readonly size: StringAttribute;

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
