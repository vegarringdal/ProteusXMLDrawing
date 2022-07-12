import { Component } from "react";
import { getDrawable } from "../utils/callDrawOnChildren";
import { getElements } from "../utils/getElement";
import { CenterLine } from "./CenterLine";
import { Circle } from "./Circle";
import { Ellipse } from "./Ellipse";
import { Equipment } from "./Equipment";
import { InstrumentComponent } from "./InstrumentComponent";
import { InstrumentConnection } from "./InstrumentConnection";
import { InsulationSymbol } from "./InsulationSymbol";
import { Label } from "./Label";
import { Line } from "./Line";
import { PipeConnectorSymbol } from "./PipeConnectorSymbol";
import { PipeFlowArrow } from "./PipeFlowArrow";
import { PipingComponent } from "./PipingComponent";
import { PolyLine } from "./PolyLine";
import { ProcessInstrument } from "./ProcessInstrument";
import { Shape } from "./Shape";

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
    public readonly label: Label[];
    public readonly pipingComponent: PipingComponent[];
    public readonly instrumentConnection: InstrumentConnection[];
    public readonly instrumentComponent: InstrumentComponent[];
    public readonly equipment: Equipment[];
    public readonly processInstrument: ProcessInstrument[];
    public readonly pipeConnectorSymbol: PipeConnectorSymbol[];
    public readonly pipeFlowArrow: PipeFlowArrow[];
    public readonly insulationSymbol: InsulationSymbol[];
    public readonly shape: Shape[];
    public readonly circle: Circle[];
    public readonly ellipse: Ellipse[];

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
        this.instrumentComponent = getElements(element, "InstrumentComponent", InstrumentComponent);
        this.equipment = getElements(element, "Equipment", Equipment);
        this.instrumentConnection = getElements(
            element,
            "InstrumentConnection",
            InstrumentConnection
        );
        this.pipingComponent = getElements(element, "PipingComponent", PipingComponent);
        this.processInstrument = getElements(element, "ProcessInstrument", ProcessInstrument);
        this.pipeConnectorSymbol = getElements(element, "PipeConnectorSymbol", PipeConnectorSymbol);
        this.pipeFlowArrow = getElements(element, "PipeFlowArrow", PipeFlowArrow);
        this.label = getElements(element, "Label", Label);
        this.insulationSymbol = getElements(element, "InsulationSymbol", InsulationSymbol);
        //
        // children plantItem **********TODO:***********
        // Presentation
        // Extent
        // PersistentID
        // Extent
        // Position
        // Scale
        // Surface
        this.circle = getElements(element, "Circle", Circle);
        // CompositeCurve
        this.ellipse = getElements(element, "Ellipse", Ellipse);
        this.line = getElements(element, "Line", Line);
        this.polyLine = getElements(element, "PolyLine", PolyLine);
        this.shape = getElements(element, "Shape", Shape);
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
    public draw(unit: number, pageOriginX: number, pageOriginY: number, offsetX = 0, offsetY = 0) {
        const drawables = getDrawable(this);
        drawables.forEach((drawable) => {
            drawable.draw(unit, pageOriginX, pageOriginY, offsetX, offsetY);
        });
    }
}
