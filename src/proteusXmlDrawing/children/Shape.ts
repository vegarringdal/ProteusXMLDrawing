import { getElements } from "../utils/getElement";
import { getPaper } from "../utils/paper";
import { Coordinate } from "./Coordinate";
import { Extent } from "./Extent";
import { GenericAttributes } from "./GenericAttributes";
import { Presentation } from "./Presentation";

/**
 * The Shape element defines a closed curve.  The interpolation between each coordinate is linear.
 */
export class Shape {
    public readonly isChild = true;
    public readonly element: Element;

    // children
    public readonly presentation: Presentation[];
    public readonly extent: Extent[];
    public readonly coordinate: Coordinate[];
    public readonly genericAttributes: GenericAttributes[];

    // attributes
 

    constructor(element: Element) {
        this.element = element;
        this.presentation = getElements(element, "Presentation", Presentation);
        this.extent = getElements(element, "Extent", Extent);
        this.coordinate = getElements(element, "Coordinate", Coordinate);
        this.genericAttributes = getElements(element, "GenericAttributes", GenericAttributes);

        // attributes
        // NumPoints
        // Filled

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
        const segments: any[] = [];
        this.coordinate.forEach((coordinate) => {
            const x = coordinate.x.value + offsetX
            const y = coordinate.y.value + offsetY
            const point = new Point(
                x * unit,
                pageOriginY * unit - y * unit
            );
            segments.push(point);
        });
        var path = new Path(segments);

        path.strokeColor = new Color({
            red: this.presentation[0].r.value,
            green: this.presentation[0].g.value,
            blue: this.presentation[0].b.value
        });

        path.strokeWidth = this.presentation[0].lineWeight.value * unit;
    }
}
