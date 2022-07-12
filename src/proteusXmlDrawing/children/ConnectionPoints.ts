import { collectMissingParts } from "../utils/findMissing";

/**
 * This element is used to describe the potential flow connections from and to the parent of this element.
 * Each potential connection location is represented as a Node element.
 * Nodes are ordered and positioned on the drawing.
 * Each Node element may be referenced by at most one Connection element.
 *
 * The first node (known as Node 0) represents the geometric origin of the parent
 * of the ConnectionPoints element.
 */
export class ConnectionPoints {
    public readonly isChild = true;
    public readonly element: Element;

    // children

    // attributes

    constructor(element: Element) {
        this.element = element;

        // helper to find missing part   // helper to find missing part
        collectMissingParts(this.element, this);
    }

    /**
     * draw element/children if any primitives
     * @param unit
     * @param pageOriginX
     * @param pageOriginY
     */
    public draw(unit: number, pageOriginX: number, pageOriginY: number, offsetX = 0, offsetY = 0) {
        // children
        //
        // Presentation
        // Extent
        // Node
        // GenericAttributes
        //
        // Attributes
        //
        // NumPoints
        // FlowIn
        // FlowOut
    }
}
