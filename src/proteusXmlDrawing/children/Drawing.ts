import { getDrawable } from "../utils/callDrawOnChildren";
import { collectMissingParts } from "../utils/findMissing";
import { getElements } from "../utils/getElement";
import { DrawingBorder } from "./DrawingBorder";
import { Extent } from "./Extent";
import { Label } from "./Label";

/**
 * Metadata and graphical annotation related to the P&ID drawing being represented
 */
export class Drawing {
    isChild = true;
    element: Element;

    drawingBorder: DrawingBorder[];
    extend: Extent[];
    label: Label[];

    constructor(element: Element) {
        this.element = element;
        this.extend = getElements(element, "Extent", Extent);
        this.drawingBorder = getElements(element, "DrawingBorder", DrawingBorder);
        this.label = getElements(element, "Label", Label);

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
