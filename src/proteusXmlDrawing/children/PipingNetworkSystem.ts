import { getDrawable } from "../utils/callDrawOnChildren";
import { getElements } from "../utils/getElement";
import { Line } from "./Line";
import { PipingNetworkSegment } from "./PipingNetworkSegment";
import { PolyLine } from "./PolyLine";

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
    public readonly isChild = true;
    

    // children
    public readonly line: Line[];
    public readonly polyLine: PolyLine[];
    pipingNetworkSegment: unknown[];

    // attributes

    constructor(element: Element) {
        // will only start with geometry elements
        // children **********TODO:***********
        // NominalDiameter
        // InsideDiameter
        // OutsideDiameter
        // StartDiameter
        // EndDiameter
        // NormalDesignPressure
        // MinimumDesignPressure
        // MaximumDesignPressure
        // NormalDesignTemperature
        // MinimumDesignTemperature
        // MaximumDesignTemperature
        // NormalOperatingPressure
        // MinimumOperatingPressure
        // MaximumOperatingPressure
        // TestPressure
        // NormalOperatingTemperature
        // MinimumOperatingTemperature
        // MaximumOperatingTemperature
        // WallThickness
        this.pipingNetworkSegment = getElements(element, "PipingNetworkSegment", PipingNetworkSegment);
        // PropertyBreak
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
    public draw(unit: number, pageOriginX: number, pageOriginY: number, offsetX = 0, offsetY = 0) {
        const drawables = getDrawable(this);
        drawables.forEach((drawable) => {
             drawable.draw(unit, pageOriginX, pageOriginY, offsetX, offsetY);
        });
    }
}
