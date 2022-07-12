import { getDrawable } from "../utils/callDrawOnChildren";
import { collectMissingParts } from "../utils/findMissing";
import { getElements } from "../utils/getElement";
import { StringAttribute } from "../utils/StringAttribute";
import { Circle } from "./Circle";
import { Ellipse } from "./Ellipse";
import { Line } from "./Line";
import { PipingNetworkSegment } from "./PipingNetworkSegment";
import { PolyLine } from "./PolyLine";
import { Shape } from "./Shape";

/**
 * A PipingNetworkSystem contains the information for a physical PipingNetworkSystem
 * in the plant or a section thereof as contained within a module. The PipingNetworkSystem
 * contains all of the PlantItems that belong to it. A PipingNetworkSystem may have multiple
 * sources and multiple destinations.’
 *
 * A PipingNetworkSystem element inherits elements and attributes from the base type ‘PlantItem’.
 * See ‘PlantItem’ for the definitions of the inherited contents.
 *
 */
export class PipingNetworkSystem {
    isChild = true;
    element: Element;

    line: Line[];
    polyLine: PolyLine[];
    pipingNetworkSegment: unknown[];
    shape: Shape[];
    circle: Circle[];
    ellipse: Ellipse[];

    id: StringAttribute;
    componentClass: StringAttribute;
    componentName: StringAttribute;
    componentType: StringAttribute;

    constructor(element: Element) {
        this.element = element;

        this.pipingNetworkSegment = getElements(
            element,
            "PipingNetworkSegment",
            PipingNetworkSegment
        );
        this.circle = getElements(element, "Circle", Circle);
        this.ellipse = getElements(element, "Ellipse", Ellipse);
        this.line = getElements(element, "Line", Line);
        this.polyLine = getElements(element, "PolyLine", PolyLine);
        this.shape = getElements(element, "Shape", Shape);

        this.id = new StringAttribute(element, "ID");
        this.componentClass = new StringAttribute(element, "ComponentClass");
        this.componentName = new StringAttribute(element, "ComponentName");
        this.componentType = new StringAttribute(element, "ComponentType");

        collectMissingParts(this.element, this);
    }

    /**
     * draw element/children if any primitives
     * @param unit
     * @param pageOriginX
     * @param pageOriginY
     */
    public draw(unit: number, pageOriginX: number, pageOriginY: number, offsetX = 0, offsetY = 0) {
        const drawables = getDrawable(this);
        drawables.forEach((drawable) => {
            drawable.draw(unit, pageOriginX, pageOriginY, offsetX, offsetY);
        });
    }
}
