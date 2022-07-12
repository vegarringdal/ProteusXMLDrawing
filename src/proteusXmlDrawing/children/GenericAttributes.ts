import { getDrawable } from "../utils/callDrawOnChildren";
import { collectMissingParts } from "../utils/findMissing";
import { getElements } from "../utils/getElement";
import { GenericAttribute } from "./GenericAttribute";

/**
 * Source system properties that relate to the XMpLant file and plant model.
 * These properties may be grouped into many GenericAttributes elements.
 */
export class GenericAttributes {
    isChild = true;
    element: Element;
    genericAttribute: GenericAttribute[];

    constructor(element: Element) {
        this.element = element;

        this.genericAttribute = getElements(element, "GenericAttribute", GenericAttribute);
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
