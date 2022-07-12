import { collectMissingParts } from "../utils/findMissing";

/**
 * TODO
 */
export class Surface {
    public readonly isChild = true;
    public readonly element: Element;

    // children

    // attributes

    constructor(element: Element) {
        this.element = element;
        // not implemented
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
        // not implemented
        // not every element will have primitives or children
    }
}
