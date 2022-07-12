import { collectMissingParts } from "../utils/findMissing";
import { StringAttribute } from "../utils/StringAttribute";

/**
 * Defines the default units of measure for the file
 */
export class UnitsOfMeasure {
    public readonly isChild = true;

    // children
    // no

    // attributes
    public readonly element: Element;
    public readonly distance: StringAttribute;
    public readonly area: StringAttribute;
    public readonly angle: StringAttribute;
    public readonly temperature: StringAttribute;
    public readonly pressure: StringAttribute;
    public readonly volume: StringAttribute;
    public readonly weight: StringAttribute;

    constructor(element: Element) {
        this.element = element;

        // children
        // no children here

        // attributes
        this.distance = new StringAttribute(element, "Distance");
        this.area = new StringAttribute(element, "Area");
        this.angle = new StringAttribute(element, "Angle");
        this.temperature = new StringAttribute(element, "Temperature");
        this.pressure = new StringAttribute(element, "Pressure");
        this.volume = new StringAttribute(element, "Volume");
        this.weight = new StringAttribute(element, "Weight");
        // helper to find missing part
        collectMissingParts(this.element, this);
    }
}
