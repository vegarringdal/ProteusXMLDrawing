import { Component } from "./Component";
import { getDrawable } from "../utils/callDrawOnChildren";
import { getElements } from "../utils/getElement";
import { getFromShapeCatalogStore } from "../utils/shapeCatalogStore";
import { StringAttribute } from "../utils/StringAttribute";
import { Extent } from "./Extent";
import { Line } from "./Line";
import { PolyLine } from "./PolyLine";
import { Position } from "./Position";
import { Presentation } from "./Presentation";
import { Shape } from "./Shape";
import { Circle } from "./Circle";
import { Ellipse } from "./Ellipse";
import { Text } from "./Text";
import { collectMissingParts } from "../utils/findMissing";
import { PersistentID } from "./PersistentID";
import { GenericAttributes } from "./GenericAttributes";

/**
 * This represents a physical component that is common to piping systems.
 *
 * A PipingComponent element inherits elements and attributes from the base type ‘PlantItem’.
 * See ‘PlantItem’ for the definitions of the inherited contents.
 *
 */
export class PipingComponent {
    isChild = true;
    element: Element;

    line: Line[];
    polyLine: PolyLine[];
    pipingComponent: PipingComponent[];
    presentation: Presentation[];
    extent: Extent[];
    position: Position[];
    component: Component[];
    shape: Shape[];
    circle: Circle[];
    ellipse: Ellipse[];
    text: Text[];

    id: StringAttribute;
    componentClass: StringAttribute;
    componentName: StringAttribute;
    componentType: StringAttribute;
    persistentID: PersistentID[];
    genericAttributes: GenericAttributes[];

    constructor(element: Element) {
        this.element = element;

        this.pipingComponent = getElements(element, "PipingComponent", PipingComponent);
        this.component = getElements(element, "Component", Component);
        this.presentation = getElements(element, "Presentation", Presentation);
        this.extent = getElements(element, "Extent", Extent);
        this.position = getElements(element, "Position", Position);
        this.circle = getElements(element, "Circle", Circle);
        this.ellipse = getElements(element, "Ellipse", Ellipse);
        this.line = getElements(element, "Line", Line);
        this.polyLine = getElements(element, "PolyLine", PolyLine);
        this.text = getElements(element, "Text", Text);
        this.shape = getElements(element, "Shape", Shape);
        this.persistentID = getElements(element, "PersistentID", PersistentID);
        this.genericAttributes = getElements(element, "GenericAttributes", GenericAttributes);

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

        if (this.componentName.value) {
            const shapeCatalogItem = getFromShapeCatalogStore(this.componentName.value);
            if (shapeCatalogItem && shapeCatalogItem !== this) {
                const x = this.position[0].location[0].x.value;
                const y = this.position[0].location[0].y.value;
                //console.log("Drawing shape", this.componentName.value);
                if (typeof (shapeCatalogItem as any).draw === "function") {
                    (shapeCatalogItem as any).draw(
                        unit,
                        pageOriginX,
                        pageOriginY,
                        x + offsetX,
                        y + offsetY
                    );
                }
            }
        }
    }
}
