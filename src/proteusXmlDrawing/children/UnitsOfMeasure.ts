/**
 * Defines the default units of measure for the file
 */
export class UnitsOfMeasure {
    public readonly isChild = true;

    // children

    // attributes

    constructor(element: Element) {
        // not implemented
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
