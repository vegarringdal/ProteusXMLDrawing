import { collectMissingParts } from "../utils/findMissing";

/**
 * A geometric primitive
 */
export class BsplineCurve {
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
        // not implemented
        // not every element will have primitives or children
    }
}
