import { getDrawable } from "../utils/callDrawOnChildren";
import { getElements } from "../utils/getElement";
import { getFromShapeCatalogStore } from "../utils/shapeCatalogStore";
import { StringAttribute } from "../utils/StringAttribute";
import { Extent } from "./Extent";
import { Line } from "./Line";
import { PolyLine } from "./PolyLine";
import { Position } from "./Position";
import { Presentation } from "./Presentation";

/**
 * This represents the point at which there is a change in specification of the piping.
 *
 * A PropertyBreak element inherits elements and attributes from the base type ‘PlantItem’.
 * See ‘AnnotationItem’ for the definitions of the inherited contents.
 *
 * I’m not sure what attributes are relevant as the specification differences should be evident
 * on the segments themselves.
 *
 * A PropertyBreak may be contained by a PipingNetworkSystem or PipingNetworkSegment element.
 * PropertyBreak elements inside a PipingNetworkSystem are those associated with components such as Tees
 * and Angled Relief Valves.  PropertyBreak elements inside a PipingNetworkSegment are involved
 * in the segment topology.
 *
 */
export class PropertyBreak {
    public readonly isChild = true;

    // children
    public readonly line: Line[];
    public readonly polyLine: PolyLine[];
    public readonly presentation: Presentation[];
    public readonly extent: Extent[];
    public readonly position: Position[];

    // attributes
    public readonly id: StringAttribute;
    public readonly componentClass: StringAttribute;
    public readonly componentName: StringAttribute;
    public readonly componentType: StringAttribute;

    constructor(element: Element) {
        // will only start with geometry elements
        // children **********TODO:***********
        // CrossPageConnection
        //
        // children plantItem **********TODO:***********
        this.presentation = getElements(element, "Presentation", Presentation);
        this.extent = getElements(element, "Extent", Extent);
        // PersistentID
        this.position = getElements(element, "Position", Position);
        // Scale
        // Surface
        // Circle
        // CompositeCurve
        // Ellipse
        this.line = getElements(element, "Line", Line);
        this.polyLine = getElements(element, "PolyLine", PolyLine);
        // Shape
        // TrimmedCurve
        // BsplineCurve
        // ConnectionPoints
        // PConnectionPoints
        // Identifier
        // Description
        // Weight
        // Material
        // MaterialDescription
        // ModelNumber
        // Supplier
        // Manufacturer
        // GenericAttributes
        // Association
        // History
        //
        //
        // attributes plantItem **********TODO:***********
        this.id = new StringAttribute(element, "ID");
        // TagName
        // Specification
        // StockNumber
        this.componentClass = new StringAttribute(element, "ComponentClass");
        this.componentName = new StringAttribute(element, "ComponentName");
        this.componentType = new StringAttribute(element, "ComponentType");
        // Revision
        // Status
    }

    /**
     * draw element/children if any primitives
     * @param unit
     * @param pageOriginX
     * @param pageOriginY
     */
    public draw(unit: number, pageOriginX: number, pageOriginY: number) {
        const drawables = getDrawable(this);
        drawables.forEach((drawable) => {
            drawable.draw(unit, pageOriginX, pageOriginY);
        });

        if (this.componentName.value) {
            const shapeCatalogItem = getFromShapeCatalogStore(this.componentName.value);
            if (shapeCatalogItem) {
                console.log("need to draw this item with offset ?");
            }
        }
    }
}
