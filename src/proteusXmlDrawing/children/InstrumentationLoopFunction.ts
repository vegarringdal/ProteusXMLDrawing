import { getDrawable } from "../utils/callDrawOnChildren";
import { collectMissingParts } from "../utils/findMissing";
import { getElements } from "../utils/getElement";
import { Circle } from "./Circle";
import { Ellipse } from "./Ellipse";
import { Line } from "./Line";
import { PolyLine } from "./PolyLine";
import { Shape } from "./Shape";
import { SignalConnectorSymbol } from "./SignalConnectorSymbol";
import { SignalLine } from "./SignalLine";

/**
 * A grouped set of instrument detail
 */
export class InstrumentationLoopFunction {
    public readonly isChild = true;
    public readonly element: Element;

    // children
    public readonly line: Line[];
    public readonly polyLine: PolyLine[];
    public readonly signalConnectorSymbol: SignalConnectorSymbol[];
    public readonly signalLine: SignalLine[];
    public readonly shape: Shape[];
    public readonly circle: Circle[];
    public readonly ellipse: Ellipse[];

    // attributes

    constructor(element: Element) {
        this.element = element;

        // children
        this.signalConnectorSymbol = getElements(
            element,
            "SignalConnectorSymbol",
            SignalConnectorSymbol
        );
        this.signalLine = getElements(element, "SignalLine", SignalLine);

        // children -> plantItem
        // Presentation
        // Extent
        // PersistentID
        // Extent
        // Position
        // Scale
        // Surface
        this.circle = getElements(element, "Circle", Circle);
        // CompositeCurve
        this.ellipse = getElements(element, "Ellipse", Ellipse);
        this.line = getElements(element, "Line", Line);
        this.polyLine = getElements(element, "PolyLine", PolyLine);
        this.shape = getElements(element, "Shape", Shape);
        // TrimmedCurve
        // BsplineCurve
        // ConnectionPoints
        // PConnectionPoints
        // Identifier
        // Description
        // Weight
        // Material
        // MaterialDescription
        // ModelNumber
        // Supplier
        // Manufacturer
        // GenericAttributes
        // Association
        // History

        // attributes -> plantItem
        // ID
        // TagName
        // Specification
        // StockNumber
        // ComponentClass
        // ComponentName
        // ComponentType
        // Revision
        // Status

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
