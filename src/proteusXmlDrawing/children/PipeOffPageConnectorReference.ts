import { collectMissingParts } from "../utils/findMissing";
import { getElements } from "../utils/getElement";
import { GenericAttributes } from "./GenericAttributes";
import { Line } from "./Line";
import { LinkedPersistentID } from "./LinkedPersistentID";

export class PipeOffPageConnectorReference {
    isChild = true;
    element: Element;
    genericAttributes: GenericAttributes[];
    linkedPersistentID: LinkedPersistentID[];

    constructor(element: Element) {
        this.element = element;
        this.genericAttributes = getElements(element, "GenericAttributes", GenericAttributes);
        this.linkedPersistentID = getElements(element, "LinkedPersistentID", LinkedPersistentID);
        collectMissingParts(this.element, this);
    }
}
