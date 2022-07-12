import { collectMissingParts } from "../utils/findMissing";
import { getElements } from "../utils/getElement";
import { addToShapeCatalogStore } from "../utils/shapeCatalogStore";
import { StringAttribute } from "../utils/StringAttribute";
import { ActuatingSystemComponent } from "./ActuatingSystemComponent";
import { CenterLine } from "./CenterLine";
import { Component } from "./Component";
import { Equipment } from "./Equipment";
import { InstrumentComponent } from "./InstrumentComponent";
import { InsulationSymbol } from "./InsulationSymbol";
import { Label } from "./Label";
import { Nozzle } from "./Nozzle";
import { PipeConnectorSymbol } from "./PipeConnectorSymbol";
import { PipeFlowArrow } from "./PipeFlowArrow";
import { PipingComponent } from "./PipingComponent";
import { ProcessInstrument } from "./ProcessInstrument";
import { ProcessInstrumentationFunction } from "./ProcessInstrumentationFunction";
import { PropertyBreak } from "./PropertyBreak";
import { SignalConnectorSymbol } from "./SignalConnectorSymbol";

/**
 * A Shape Catalogue defines a symbol library for a file.
 * See ComponentName for how to reference and name a symbol in the catalogue.
 * See Scale for how to scale symbols when drawn.  See Position for how to rotate a symbol.
 */
export class ShapeCatalogue {
    isChild = true;
    element: Element;

    // children
    equipment: Equipment[];
    pipingComponent: PipingComponent[];
    processInstrument: ProcessInstrument[];
    instrumentComponent: InstrumentComponent[];
    pipeConnectorSymbol: PipeConnectorSymbol[];
    signalConnectorSymbol: SignalConnectorSymbol[];
    insulationSymbol: InsulationSymbol[];
    propertyBreak: PropertyBreak[];
    label: Label[];
    pipeFlowArrow: PipeFlowArrow[];
    component: Component[];
    nozzle: Nozzle[];
    processInstrumentationFunction: ProcessInstrumentationFunction[];
    actuatingSystemComponent: ActuatingSystemComponent[];

    // attributes
    name: StringAttribute;
    version: StringAttribute;
    units: StringAttribute;
    date: StringAttribute;

    constructor(element: Element) {
        this.element = element;
        // children
        this.equipment = getElements(element, "Equipment", Equipment);
        this.pipingComponent = getElements(element, "PipingComponent", PipingComponent);
        this.nozzle = getElements(element, "Nozzle", Nozzle);

        this.processInstrument = getElements(element, "ProcessInstrument", ProcessInstrument);
        this.instrumentComponent = getElements(element, "InstrumentComponent", InstrumentComponent);
        this.processInstrumentationFunction = getElements(
            element,
            "ProcessInstrumentationFunction",
            ProcessInstrumentationFunction
        );

        this.component = getElements(element, "Component", Component);
        this.pipeConnectorSymbol = getElements(element, "PipeConnectorSymbol", PipeConnectorSymbol);
        this.signalConnectorSymbol = getElements(
            element,
            "SignalConnectorSymbol",
            SignalConnectorSymbol
        );

        this.actuatingSystemComponent = getElements(
            element,
            "ActuatingSystemComponent",
            ActuatingSystemComponent
        );

        this.insulationSymbol = getElements(element, "InsulationSymbol", InsulationSymbol);
        this.propertyBreak = getElements(element, "PropertyBreak", PropertyBreak);
        this.label = getElements(element, "Label", Label);
        this.pipeFlowArrow = getElements(element, "PipeFlowArrow", PipeFlowArrow);

        // attributes
        this.name = new StringAttribute(element, "Name");
        this.version = new StringAttribute(element, "Version");
        this.units = new StringAttribute(element, "Units");
        this.date = new StringAttribute(element, "Date");

        const keys = Object.keys(this);
        keys.forEach((key: any) => {
            const that = this as any;

            if (Array.isArray(that[key])) {
                that[key].forEach((child: any) => {
                    if (child.isChild) {
                        if (child.componentName?.value) {
                            addToShapeCatalogStore(child.componentName?.value, child);
                        }
                    }
                });
            }
        });

        // helper to find missing part
        collectMissingParts(this.element, this);
    }

    // this is not elements we will draw, just lookup
    // draw(){}
}
