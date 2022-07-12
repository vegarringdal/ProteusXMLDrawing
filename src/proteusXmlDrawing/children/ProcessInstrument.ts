import { Component } from "react";
import { getDrawable } from "../utils/callDrawOnChildren";
import { collectMissingParts } from "../utils/findMissing";
import { getElements } from "../utils/getElement";
import { getFromShapeCatalogStore } from "../utils/shapeCatalogStore";
import { StringAttribute } from "../utils/StringAttribute";
import { CenterLine } from "./CenterLine";
import { Circle } from "./Circle";
import { Ellipse } from "./Ellipse";
import { Equipment } from "./Equipment";
import { Extent } from "./Extent";
import { InstrumentComponent } from "./InstrumentComponent";
import { InstrumentConnection } from "./InstrumentConnection";
import { InsulationSymbol } from "./InsulationSymbol";
import { Label } from "./Label";
import { Line } from "./Line";
import { PipeConnectorSymbol } from "./PipeConnectorSymbol";
import { PipeFlowArrow } from "./PipeFlowArrow";
import { PipingComponent } from "./PipingComponent";
import { PolyLine } from "./PolyLine";
import { Position } from "./Position";
import { Presentation } from "./Presentation";
import { Shape } from "./Shape";

/**
 * Offline instruments connected to the process line.
 */
export class ProcessInstrument {
    public readonly isChild = true;
    public readonly element: Element;

    // children
    public readonly centerLine: CenterLine[];
    public readonly component: Component<unknown, unknown, unknown>[];
    public readonly instrumentComponent: InstrumentComponent[];
    public readonly equipment: Equipment[];
    public readonly instrumentConnection: InstrumentConnection[];
    public readonly pipingComponent: PipingComponent[];
    public readonly processInstrument: ProcessInstrument[];
    public readonly pipeConnectorSymbol: PipeConnectorSymbol[];
    public readonly pipeFlowArrow: PipeFlowArrow[];
    public readonly label: Label[];
    public readonly insulationSymbol: InsulationSymbol[];
    public readonly line: Line[];
    public readonly polyLine: PolyLine[];
    public readonly presentation: Presentation[];
    public readonly extent: Extent[];
    public readonly position: Position[];
    public readonly shape: Shape[];
    public readonly circle: Circle[];
    public readonly ellipse: Ellipse[];

    // attributes
    public readonly id: StringAttribute;
    public readonly componentClass: StringAttribute;
    public readonly componentName: StringAttribute;
    public readonly componentType: StringAttribute;

    constructor(element: Element) {
        this.element = element;

        // children
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

        // children -> plantItem
        this.presentation = getElements(element, "Presentation", Presentation);
        this.extent = getElements(element, "Extent", Extent);
        // PersistentID
        this.position = getElements(element, "Position", Position);
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

        // attributes
        // DualFlow

        // attributes -> plantItem
        this.id = new StringAttribute(element, "ID");
        // TagName
        // Specification
        // StockNumber
        this.componentClass = new StringAttribute(element, "ComponentClass");
        this.componentName = new StringAttribute(element, "ComponentName");
        this.componentType = new StringAttribute(element, "ComponentType");
        // Revision
        // Status
        // helper to find missing part
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
