export class StringAttribute {
    element: Element;
    name: string;
    isAttribute: boolean;
    type: string;
    value: string;

    constructor(element: Element, attributeName: string) {
        this.element = element;
        this.name = attributeName;
        this.type = "string";
        this.isAttribute = true;

        const value = element.getAttribute(attributeName);

        if (value) {
            this.value = value;
        } else {
            this.value = "";
        }
    }
}
