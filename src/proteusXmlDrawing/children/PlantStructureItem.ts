import { collectMissingParts } from "../utils/findMissing";
import { getElements } from "../utils/getElement";
import { Association } from "./Association";
import { GenericAttributes } from "./GenericAttributes";

export class PlantStructureItem {
    isChild = true;
    element: Element;
    genericAttributes: GenericAttributes[];
    association: Association[];

    constructor(element: Element) {
        this.element = element;
        this.genericAttributes = getElements(element, "GenericAttributes", GenericAttributes);
        this.association = getElements(element, "Association", Association);

        collectMissingParts(this.element, this);
    }
}
