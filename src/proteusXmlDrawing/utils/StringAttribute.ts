export class StringAttribute {
    public readonly element: Element;
    public readonly name: string;
    public readonly isAttribute: boolean;
    public readonly type: string;
    public readonly value: string;

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
