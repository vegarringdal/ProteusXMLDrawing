import { Component } from "react";
import { getDrawable } from "../utils/callDrawOnChildren";
import { getElements } from "../utils/getElement";
import { CenterLine } from "./CenterLine";
import { Line } from "./Line";
import { PolyLine } from "./PolyLine";

/**
 * See ‘2.2.1’ for details on the use of PipingNetworkSegments.
 *
 * A PipingNetworkSegment element inherits elements and attributes from the base type ‘PlantItem’.
 * See ‘PlantItem’ for the definitions of the inherited contents.
 *
 * PipeConnectorSymbol elements representing on and off page connectivity are contained by the
 * PipingNetworkSegment.  See for details of PipingNetworkSegment connectivity.
 *
 * If a PipingNetworkSegment represents the connectivity between an instrument and a process
 * line then the ComponentClass attribute will be given the value ‘ProcessInstrumentConnection’.
 *
 *
 */
export class PipingNetworkSegment {
    public readonly isChild = true;
   

    // children
    public readonly centerLine: CenterLine[];
    public readonly line: Line[];
    public readonly polyLine: PolyLine[];
    public readonly component: Component[];

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
        // Connection
        this.centerLine = getElements(element, "CenterLine", CenterLine);
        this.component = getElements(element, "Component", Component);
        // InstrumentComponent
        // Equipment
        // InstrumentConnection
        // PipingComponent
        // ProcessInstrument
        // PipeConnectorSymbol
        // PipeFlowArrow
        // Label
        // InsulationSymbol
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
        // attributes  **********TODO:***********
        // DualFlow
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
