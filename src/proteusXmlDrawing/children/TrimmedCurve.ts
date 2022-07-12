import { getDrawable } from "../utils/callDrawOnChildren";
import { collectMissingParts } from "../utils/findMissing";
import { getElements } from "../utils/getElement";
import { Circle } from "./Circle";

/**
 * A geometric primitive
 */
export class TrimmedCurve {
    isChild = true;
    element: Element;
    circle: Circle[];

    constructor(element: Element) {
        this.element = element;

        this.circle = getElements(element, "Circle", Circle);

        collectMissingParts(this.element, this);
    }

    /**
     * draw element/children if any primitives
     * @param unit
     * @param pageOriginX
     * @param pageOriginY
     */
    public draw(unit: number, pageOriginX: number, pageOriginY: number, offsetX = 0, offsetY = 0) {

        // todo, we need to improve these... just draw arc
        const drawables = getDrawable(this);
        drawables.forEach((drawable) => {
            drawable.draw(unit, pageOriginX, pageOriginY, offsetX, offsetY);
        });
    }
}
