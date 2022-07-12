import { collectMissingParts } from "../utils/findMissing";
import { getElements } from "../utils/getElement";
import { NumberAttribute } from "../utils/NumberAttribute";
import { getPaper } from "../utils/paper";
import { StringAttribute } from "../utils/StringAttribute";
import { Coordinate } from "./Coordinate";
import { Extent } from "./Extent";
import { GenericAttributes } from "./GenericAttributes";
import { Position } from "./Position";
import { Presentation } from "./Presentation";

/**
 * A geometric primitive
 */
export class Circle {
    isChild = true;
    element: Element;

    presentation: Presentation[];
    extent: Extent[];
    position: Position[];
    genericAttributes: GenericAttributes[];

    radius: NumberAttribute;
    filled: StringAttribute;

    constructor(element: Element) {
        this.element = element;

        this.presentation = getElements(element, "Presentation", Presentation);
        this.extent = getElements(element, "Extent", Extent);
        this.position = getElements(element, "Position", Position);
        this.genericAttributes = getElements(element, "GenericAttributes", GenericAttributes);

        this.radius = new NumberAttribute(element, "Radius");
        this.filled = new StringAttribute(element, "Filled");

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

        const x = this.position[0].location[0].x.value + offsetX;
        const y = this.position[0].location[0].y.value + offsetY;
        const point = new Point(x * unit, pageOriginY * unit - y * unit);

        const myCircle = new Path.Circle(point, this.radius.value * unit);

        myCircle.strokeColor = new Color({
            red: this.presentation[0].r.value,
            green: this.presentation[0].g.value,
            blue: this.presentation[0].b.value
        });

        myCircle.strokeWidth = this.presentation[0].lineWeight.value * unit;

        if (this.filled.value) {
            myCircle.fillColor = new Color("black");
        }
    }
}
