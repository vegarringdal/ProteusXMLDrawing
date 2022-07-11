import { getDrawable } from "../utils/callDrawOnChildren";
import { getElements } from "../utils/getElement";
import { StringAttribute } from "../utils/StringAttribute";
import { Line } from "./Line";
import { PolyLine } from "./PolyLine";

/**
 * This represents a physical component that is common to piping systems.
 *
 * A PipingComponent element inherits elements and attributes from the base type ‘PlantItem’.
 * See ‘PlantItem’ for the definitions of the inherited contents.
 *
 */
export class PipeConnectorSymbol {
    public readonly isChild = true;

    // children
    public readonly line: Line[];
    public readonly polyLine: PolyLine[];

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
        // Presentation
        // Extent
        // PersistentID
        // Extent
        // Position
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
    }
}
