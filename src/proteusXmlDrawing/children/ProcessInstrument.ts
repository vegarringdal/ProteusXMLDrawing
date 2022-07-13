import { Component } from "react";
import { getDrawable } from "../utils/callDrawOnChildren";
import { collectMissingParts } from "../utils/findMissing";
import { getElements } from "../utils/getElement";
import { getFromShapeCatalogStore } from "../utils/shapeCatalogStore";
import { StringAttribute } from "../utils/StringAttribute";
import { Association } from "./Association";
import { CenterLine } from "./CenterLine";
import { Circle } from "./Circle";
import { ConnectionPoints } from "./ConnectionPoints";
import { Ellipse } from "./Ellipse";
import { Equipment } from "./Equipment";
import { Extent } from "./Extent";
import { GenericAttributes } from "./GenericAttributes";
import { InstrumentComponent } from "./InstrumentComponent";
import { InstrumentConnection } from "./InstrumentConnection";
import { InsulationSymbol } from "./InsulationSymbol";
import { Label } from "./Label";
import { Line } from "./Line";
import { PersistentID } from "./PersistentID";
import { PipeConnectorSymbol } from "./PipeConnectorSymbol";
import { PipeFlowArrow } from "./PipeFlowArrow";
import { PipingComponent } from "./PipingComponent";
import { PolyLine } from "./PolyLine";
import { Position } from "./Position";
import { Presentation } from "./Presentation";
import { Shape } from "./Shape";
import { Text } from "./Text";
import { TrimmedCurve } from "./TrimmedCurve";

/**
 * Offline instruments connected to the process line.
 */
export class ProcessInstrument {
    isChild = true;
    element: Element;

    centerLine: CenterLine[];
    component: Component<unknown, unknown, unknown>[];
    instrumentComponent: InstrumentComponent[];
    equipment: Equipment[];
    instrumentConnection: InstrumentConnection[];
    pipingComponent: PipingComponent[];
    processInstrument: ProcessInstrument[];
    pipeConnectorSymbol: PipeConnectorSymbol[];
    pipeFlowArrow: PipeFlowArrow[];
    label: Label[];
    insulationSymbol: InsulationSymbol[];
    line: Line[];
    polyLine: PolyLine[];
    presentation: Presentation[];
    extent: Extent[];
    position: Position[];
    shape: Shape[];
    circle: Circle[];
    ellipse: Ellipse[];

    id: StringAttribute;
    componentClass: StringAttribute;
    componentName: StringAttribute;
    componentType: StringAttribute;
    text: Text[];
    trimmedCurve: TrimmedCurve[];
    persistentID: PersistentID[];
    genericAttributes: GenericAttributes[];
    association: Association[];
    connectionPoints: ConnectionPoints[];

    constructor(element: Element) {
        this.element = element;

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
        this.presentation = getElements(element, "Presentation", Presentation);
        this.extent = getElements(element, "Extent", Extent);
        this.position = getElements(element, "Position", Position);
        this.circle = getElements(element, "Circle", Circle);
        this.ellipse = getElements(element, "Ellipse", Ellipse);
        this.text = getElements(element, "Text", Text);
        this.line = getElements(element, "Line", Line);
        this.polyLine = getElements(element, "PolyLine", PolyLine);
        this.shape = getElements(element, "Shape", Shape);
        this.trimmedCurve = getElements(element, "TrimmedCurve", TrimmedCurve);
        this.persistentID = getElements(element, "PersistentID", PersistentID);
        this.genericAttributes = getElements(element, "GenericAttributes", GenericAttributes);
        this.association = getElements(element, "Association", Association);
        this.connectionPoints = getElements(element, "ConnectionPoints", ConnectionPoints);

        this.id = new StringAttribute(element, "ID");
        this.componentClass = new StringAttribute(element, "ComponentClass");
        this.componentName = new StringAttribute(element, "ComponentName");
        this.componentType = new StringAttribute(element, "ComponentType");

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
