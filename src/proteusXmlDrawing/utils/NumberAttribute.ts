export class NumberAttribute {
    public readonly element: Element;
    public readonly name: string;
    public readonly isAttribute: boolean;
    public readonly value: number;
    public readonly type: string;

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
