import { getDrawable } from "../utils/callDrawOnChildren";
import { getElements } from "../utils/getElement";
import { Line } from "./Line";
import { PolyLine } from "./PolyLine";

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


    // attributes

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
        // ID
        // TagName
        // Specification
        // StockNumber
        // ComponentClass
        // ComponentName
        // ComponentType
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
