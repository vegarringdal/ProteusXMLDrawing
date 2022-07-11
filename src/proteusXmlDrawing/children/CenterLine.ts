import { getElements } from "../utils/getElement";
import { getPaper } from "../utils/paper";
import { StringAttribute } from "../utils/StringAttribute";
import { Coordinate } from "./Coordinate";
import { Extent } from "./Extent";
import { GenericAttributes } from "./GenericAttributes";
import { Presentation } from "./Presentation";

/**
 * A geometric primitive
 */
export class CenterLine {
    public readonly isChild = true;
    public readonly element: Element;

    // children
    public readonly presentation: Presentation[];
    public readonly extent: Extent[];
    public readonly coordinate: Coordinate[];
    public readonly genericAttributes: GenericAttributes[];

    // attributes
    public readonly id: StringAttribute;

    constructor(element: Element) {
        this.element = element;
        this.presentation = getElements(element, "Presentation", Presentation);
        this.extent = getElements(element, "Extent", Extent);
        this.coordinate = getElements(element, "Coordinate", Coordinate);
        this.genericAttributes = getElements(element, "GenericAttributes", GenericAttributes);

        // TODO attributes
        // NumPoints
        this.id = new StringAttribute(element, "ID");
    }

    /**
     * draw element/children if any primitives
     * @param unit
     * @param pageOriginX
     * @param pageOriginY
     */
    public draw(unit: number, pageOriginX: number, pageOriginY: number) {
        const Point = getPaper().Point;
        const Path = getPaper().Path;
        const Color = getPaper().Color;
        const segments: any[] = [];
        this.coordinate.forEach((coordinate) => {
            const point = new Point(
                coordinate.x.value * unit,
                pageOriginY * unit - coordinate.y.value * unit
            );
            segments.push(point);
        });
        var path = new Path(segments);

        // todo fix styling later, need to get something drawing as POC
        path.strokeColor = new Color(this.presentation[0].color);
        path.strokeWidth = this.presentation[0].lineWeight.value * unit;
    }
}
