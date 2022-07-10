import { getDrawable } from "../utils/callDrawOnChildren";
import { getElements } from "../utils/getElement";
import { Line } from "./Line";
import { PolyLine } from "./PolyLine";

/**
 * Used to group geometric and text primitives within a Drawing element.  
 * This inherits all elements and attributes from the base type ‘PlantItem’.  
 * See ‘PlantItem’ for the definitions of the inherited contents..
 *
 */
export class Component {
    public readonly isChild = true;
    

    // children
    public readonly line: Line[];
    public readonly polyLine: PolyLine[];
    public readonly component: Component[];

    // attributes

    constructor(element: Element) {
        // will only start with geometry elements
        //
        this.component = getElements(element, "Component", Component);
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
