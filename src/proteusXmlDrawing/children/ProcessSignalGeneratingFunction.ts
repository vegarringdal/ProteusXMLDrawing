import { collectMissingParts } from "../utils/findMissing";
import { getElements } from "../utils/getElement";
import { Association } from "./Association";
import { GenericAttributes } from "./GenericAttributes";

export class ProcessSignalGeneratingFunction {
    isChild = true;
    element: Element;
    genericAttributes: GenericAttributes[];
    association: Association[];

    constructor(element: Element) {
        this.element = element;
        this.genericAttributes = getElements(element, "GenericAttributes", GenericAttributes);
        this.association = getElements(element, "Association", Association);
        // helper to find missing part
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
