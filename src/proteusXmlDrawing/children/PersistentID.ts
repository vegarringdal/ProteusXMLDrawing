import { StringAttribute } from "../utils/StringAttribute";

export class PersistentID {
    public readonly isChild = true;
    public readonly element: Element;

    // children
    // no children on this element

    // attributes
    public readonly identifier: StringAttribute;
    public readonly context: StringAttribute;

    constructor(element: Element) {
        this.element = element;

        // children
        // no children

        // attributes
        this.identifier = new StringAttribute(element, "Identifier");
        this.context = new StringAttribute(element, "Context");
    }
}
