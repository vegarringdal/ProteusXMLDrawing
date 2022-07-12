import { getDrawable } from "../utils/callDrawOnChildren";
import { collectMissingParts } from "../utils/findMissing";

/**
 * TODO: SPEC missing details
 */
export class PipingSystem {
    isChild = true;
    element: Element;

    constructor(element: Element) {
        this.element = element;

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
