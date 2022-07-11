/**
 * A description of the material relating to an item
 * sample: <MaterialDescription>Some descriptive text</MaterialDescription>
 */
export class MaterialDescription {
    public readonly isChild = true;
    public readonly element: Element;

    // children
    // nome

    // attributes
    // none

    constructor(element: Element) {
        this.element = element;
    }
}
