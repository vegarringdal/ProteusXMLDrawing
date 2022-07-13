import { collectMissingParts } from "../utils/findMissing";
import { getElements } from "../utils/getElement";
import { GenericAttributes } from "./GenericAttributes";
import { NominalDiameter } from "./NominalDiameter";
import { Position } from "./Position";

export class Node {
    isChild = true;
    element: Element;
    position: Position[];
    genericAttributes: GenericAttributes[];
    nominalDiameter: NominalDiameter[];

    constructor(element: Element) {
        this.element = element;

        this.genericAttributes = getElements(element, "GenericAttributes", GenericAttributes);
        this.position = getElements(element, "Position", Position);
        this.nominalDiameter = getElements(element, "NominalDiameter", NominalDiameter);

        collectMissingParts(this.element, this);
    }
}
