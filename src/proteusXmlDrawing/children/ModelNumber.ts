/**
 * String element detailing the model number for a component.
 * sample: <ModelNumber>A485798347-BjiOM-9347</ModelNumber>
 */
export class ModelNumber {
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
