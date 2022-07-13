import { getDrawable } from "../utils/callDrawOnChildren";
import { collectMissingParts } from "../utils/findMissing";
import { getElements } from "../utils/getElement";
import { DrawingBorder } from "./DrawingBorder";
import { Extent } from "./Extent";
import { GenericAttributes } from "./GenericAttributes";
import { Label } from "./Label";
import { Line } from "./Line";
import { Presentation } from "./Presentation";
import { Text } from "./Text";

/**
 * Metadata and graphical annotation related to the P&ID drawing being represented
 */
export class Drawing {
    isChild = true;
    element: Element;

    drawingBorder: DrawingBorder[];
    extent: Extent[];
    label: Label[];
    presentation: Presentation[];
    genericAttributes: GenericAttributes[];
    text: Text[];
    line: Line[];

    constructor(element: Element) {
        this.element = element;

        this.presentation = getElements(element, "Presentation", Presentation);
        this.extent = getElements(element, "Extent", Extent);
        this.genericAttributes = getElements(element, "GenericAttributes", GenericAttributes);
        this.drawingBorder = getElements(element, "DrawingBorder", DrawingBorder);
        this.label = getElements(element, "Label", Label);
        this.line = getElements(element, "Line", Line);
        this.text = getElements(element, "Text", Text);

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
