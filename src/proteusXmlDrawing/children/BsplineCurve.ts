/**
 * A geometric primitive
 */
export class BsplineCurve {
    public readonly isChild = true;
    public readonly element: Element;

    // children

    // attributes

    constructor(element: Element) {
        this.element = element;
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
