export class NumberAttribute {
    element: Element;
    name: string;
    isAttribute: boolean;
    value: number;
    type: string;

    constructor(element: Element, attributeName: string) {
        this.element = element;
        this.name = attributeName;
        this.type = "number";
        this.isAttribute = true;

        const value = element.getAttribute(attributeName);

        if (value) {
            this.value = parseFloat(value);
        } else {
            this.value = 0;
        }
    }
}
