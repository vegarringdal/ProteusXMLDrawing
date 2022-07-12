import { collectMissingParts } from "../utils/findMissing";
import { StringAttribute } from "../utils/StringAttribute";

export class PersistentID {
    isChild = true;
    element: Element;

    identifier: StringAttribute;
    context: StringAttribute;

    constructor(element: Element) {
        this.element = element;

        // no children

        this.identifier = new StringAttribute(element, "Identifier");
        this.context = new StringAttribute(element, "Context");

        collectMissingParts(this.element, this);
    }
}
