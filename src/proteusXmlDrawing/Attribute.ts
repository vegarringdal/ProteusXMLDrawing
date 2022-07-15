export class Attribute {
    public value: string | null;
    valueAsString: string;
    valueAsNumber: number;
    constructor(public element: Element, public attributeName: string) {
        this.value = element.getAttribute(attributeName);
        this.valueAsString = this.value || "";
        this.valueAsNumber = parseFloat(this.value || "");
        if (isNaN(this.valueAsNumber)) {
            this.valueAsNumber = 0;
        }
    }
}
