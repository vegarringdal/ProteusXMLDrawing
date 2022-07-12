import { collectMissingParts } from "../utils/findMissing";
import { getElements } from "../utils/getElement";
import { NumberAttribute } from "../utils/NumberAttribute";
import { getPaper } from "../utils/paper";
import { StringAttribute } from "../utils/StringAttribute";
import { Extent } from "./Extent";
import { GenericAttributes } from "./GenericAttributes";
import { Position } from "./Position";
import { Presentation } from "./Presentation";

/**
 * The representation of a piece of plant equipment
 */
export class Ellipse {
    public readonly isChild = true;
    public readonly element: Element;

    // children
    public readonly presentation: Presentation[];
    public readonly extent: Extent[];
    public readonly position: Position[];
    public readonly genericAttributes: GenericAttributes[];

    // attributes
    public readonly primaryAxis: NumberAttribute;
    public readonly secondaryAxis: NumberAttribute;
    public readonly filled: StringAttribute;

    constructor(element: Element) {
        this.element = element;

        // children
        this.presentation = getElements(element, "Presentation", Presentation);
        this.extent = getElements(element, "Extent", Extent);
        this.position = getElements(element, "Position", Position);
        this.genericAttributes = getElements(element, "GenericAttributes", GenericAttributes);

        // attributes
        this.primaryAxis = new NumberAttribute(element, "PrimaryAxis");
        this.secondaryAxis = new NumberAttribute(element, "SecondaryAxis");
        this.filled = new StringAttribute(element, "Filled");

        // helper to find missing part   // helper to find missing part
        collectMissingParts(this.element, this);
    }

    /**
     * draw element/children if any primitives
     * @param unit
     * @param pageOriginX
     * @param pageOriginY
     */
    public draw(unit: number, pageOriginX: number, pageOriginY: number, offsetX = 0, offsetY = 0) {
        const Point = getPaper().Point;
        const Path = getPaper().Path;
        const Color = getPaper().Color;
        const Size = getPaper().Size;
        const Rectangle = getPaper().Rectangle;
        const Ellipse = getPaper().Shape.Ellipse;

        const x = this.position[0].location[0].x.value + offsetX;
        const y = this.position[0].location[0].y.value + offsetY;
        const point = new Point(x * unit, pageOriginY * unit - y * unit);

        const rectangle = new Rectangle(
            point,
            new Size(this.primaryAxis.value * unit, this.secondaryAxis.value * unit)
        );
        const ellipse = new Path.Ellipse(rectangle);

        ellipse.strokeColor = new Color({
            red: this.presentation[0].r.value,
            green: this.presentation[0].g.value,
            blue: this.presentation[0].b.value
        });

        ellipse.strokeWidth = this.presentation[0].lineWeight.value * unit;

        if (this.filled.value) {
            ellipse.fillColor = new Color("black");
        }
    }
}
