import { collectMissingParts } from "../utils/findMissing";
import { getElements } from "../utils/getElement";
import { LinkedPersistentID } from "./LinkedPersistentID";

export class CrossPageConnection {
    isChild = true;
    element: Element;
    linkedPersistentID: LinkedPersistentID[];

    constructor(element: Element) {
        this.element = element;

        this.linkedPersistentID = getElements(element, "LinkedPersistentID", LinkedPersistentID);
        collectMissingParts(this.element, this);
    }

    /**
     * draw element/children if any primitives
     * @param unit
     * @param pageOriginX
     * @param pageOriginY
     */
    public draw(unit: number, pageOriginX: number, pageOriginY: number, offsetX = 0, offsetY = 0) {}
}
