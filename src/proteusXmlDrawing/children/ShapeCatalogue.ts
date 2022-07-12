import { getElements } from "../utils/getElement";
import { addToShapeCatalogStore } from "../utils/shapeCatalogStore";
import { StringAttribute } from "../utils/StringAttribute";
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
    public readonly isChild = true;

    // children
    public readonly equipment: Equipment[];
    public readonly pipingComponent: PipingComponent[];
    public readonly processInstrument: ProcessInstrument[];
    public readonly instrumentComponent: InstrumentComponent[];
    public readonly pipeConnectorSymbol: PipeConnectorSymbol[];
    public readonly signalConnectorSymbol: SignalConnectorSymbol[];
    public readonly insulationSymbol: InsulationSymbol[];
    public readonly propertyBreak: PropertyBreak[];
    public readonly label: Label[];
    public readonly pipeFlowArrow: PipeFlowArrow[];
    public readonly component: Component[];
    public readonly nozzle: Nozzle[];
    public readonly processInstrumentationFunction: ProcessInstrumentationFunction[];

    // attributes
    public readonly name: StringAttribute;
    public readonly version: StringAttribute;
    public readonly units: StringAttribute;
    public readonly date: StringAttribute;

    constructor(element: Element) {
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

        this.component = getElements(element, "centerLine", Component);
        this.pipeConnectorSymbol = getElements(element, "PipeConnectorSymbol", PipeConnectorSymbol);
        this.signalConnectorSymbol = getElements(
            element,
            "SignalConnectorSymbol",
            SignalConnectorSymbol
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
        //TODO: I also need to make a map of children... since position will be relative
    }

    // this is not elements we will draw, just lookup
    // draw(){}
}
