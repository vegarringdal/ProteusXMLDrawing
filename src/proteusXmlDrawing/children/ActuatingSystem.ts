import { getDrawable } from "../utils/callDrawOnChildren";
import { collectMissingParts } from "../utils/findMissing";
import { getElements } from "../utils/getElement";
import { StringAttribute } from "../utils/StringAttribute";
import { ActuatingSystemComponent } from "./ActuatingSystemComponent";
import { Association } from "./Association";
import { Circle } from "./Circle";
import { Ellipse } from "./Ellipse";
import { GenericAttributes } from "./GenericAttributes";
import { Line } from "./Line";
import { PolyLine } from "./PolyLine";
import { Shape } from "./Shape";

export class ActuatingSystem {
    isChild = true;
    element: Element;

    line: Line[];
    polyLine: PolyLine[];
    shape: Shape[];
    circle: Circle[];
    ellipse: Ellipse[];
    actuatingSystemComponent: ActuatingSystemComponent[];

    id: StringAttribute;
    componentClass: StringAttribute;
    componentName: StringAttribute;
    componentType: StringAttribute;
    genericAttributes: GenericAttributes[];
    association: Association[];

    constructor(element: Element) {
        this.element = element;

        this.circle = getElements(element, "Circle", Circle);
        this.ellipse = getElements(element, "Ellipse", Ellipse);
        this.line = getElements(element, "Line", Line);
        this.polyLine = getElements(element, "PolyLine", PolyLine);
        this.shape = getElements(element, "Shape", Shape);
        this.actuatingSystemComponent = getElements(
            element,
            "ActuatingSystemComponent",
            ActuatingSystemComponent
        );
        this.genericAttributes = getElements(element, "GenericAttributes", GenericAttributes);
        this.association = getElements(element, "Association", Association);
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