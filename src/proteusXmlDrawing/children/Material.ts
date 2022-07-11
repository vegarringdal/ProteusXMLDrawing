/**
 * The name of the Material used to construct the item
 * sample: <Material>Copper</Material>
 */
export class Material {
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
