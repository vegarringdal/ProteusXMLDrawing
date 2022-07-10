import { getDrawable } from "../utils/callDrawOnChildren";
import { getElements } from "../utils/getElement";
import { DrawingBorder } from "./DrawingBorder";
import { Extent } from "./Extent";

/**
 * Metadata and graphical annotation related to the P&ID drawing being represented
 */
export class Drawing {
    public readonly isChild = true;
    public readonly element: Element;

    // children
    public readonly drawingBorder: DrawingBorder[];
    public readonly extend: Extent[];

    // attributes

    constructor(element: Element) {
        this.element = element;
        this.extend = getElements(element, "Extent", Extent);
        this.drawingBorder = getElements(element, "DrawingBorder", DrawingBorder);
    }

    /**
     * draw element/children if any primitives
     * @param unit
     * @param pageOriginX
     * @param pageOriginY
     */
    public draw(unit: number, pageOriginX: number, pageOriginY: number) {
        const drawables = getDrawable(this);
        drawables.forEach((drawable) => {
            drawable.draw(unit, pageOriginX, pageOriginY);
        });
    }
}
