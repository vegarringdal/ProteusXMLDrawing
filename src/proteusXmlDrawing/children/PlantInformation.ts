import { UnitsOfMeasure } from "./UnitsOfMeasure";

/**
 * The properties of a plant model This includes properties like its name,
 * modification date, editing system etc.
 * The PlantInformation element must be the first child element of a PlantModel element.
 */
export class PlantInformation {
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
