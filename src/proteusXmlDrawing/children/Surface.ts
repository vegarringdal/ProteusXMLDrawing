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
    }

    /**
     * draw element/children if any primitives
     * @param unit
     * @param pageOriginX
     * @param pageOriginY
     */
    public draw(unit: number, pageOriginX: number, pageOriginY: number) {
        // not implemented
        // not every element will have primitives or children
    }
}
