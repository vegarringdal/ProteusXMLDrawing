import { Component } from "react";
import { getDrawable } from "../utils/callDrawOnChildren";
import { collectMissingParts } from "../utils/findMissing";
import { getElements } from "../utils/getElement";
import { StringAttribute } from "../utils/StringAttribute";
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
    isChild = true;
    element: Element;

    // children
    centerLine: CenterLine[];
    line: Line[];
    polyLine: PolyLine[];
    component: Component[];
    label: Label[];
    pipingComponent: PipingComponent[];
    instrumentConnection: InstrumentConnection[];
    instrumentComponent: InstrumentComponent[];
    equipment: Equipment[];
    processInstrument: ProcessInstrument[];
    pipeConnectorSymbol: PipeConnectorSymbol[];
    pipeFlowArrow: PipeFlowArrow[];
    insulationSymbol: InsulationSymbol[];
    shape: Shape[];
    circle: Circle[];
    ellipse: Ellipse[];

    // attributes
    id: StringAttribute;
    componentClass: StringAttribute;
    componentName: StringAttribute;
    componentType: StringAttribute;

    constructor(element: Element) {
        this.element = element;

        // children
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
        this.circle = getElements(element, "Circle", Circle);
        this.ellipse = getElements(element, "Ellipse", Ellipse);
        this.line = getElements(element, "Line", Line);
        this.polyLine = getElements(element, "PolyLine", PolyLine);
        this.shape = getElements(element, "Shape", Shape);

        // attributes
        this.id = new StringAttribute(element, "ID");
        this.componentClass = new StringAttribute(element, "ComponentClass");
        this.componentName = new StringAttribute(element, "ComponentName");
        this.componentType = new StringAttribute(element, "ComponentType");

        // helper to find missing part   // helper to find missing part
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
