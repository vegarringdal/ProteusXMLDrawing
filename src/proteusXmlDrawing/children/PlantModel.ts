import { BsplineCurve } from "./BsplineCurve";
import { Circle } from "./Circle";
import { CompositeCurve } from "./CompositeCurve";
import { Drawing } from "./Drawing";
import { Ellipse } from "./Ellipse";
import { Equipment } from "./Equipment";
import { Extent } from "./Extent";
import { GenericAttributes } from "./GenericAttributes";
import { InstrumentComponent } from "./InstrumentComponent";
import { InstrumentLoop } from "./InstrumentLoop";
import { Line } from "./Line";
import { PipingNetworkSystem } from "./PipingNetworkSystem";
import { PipingSystem } from "./PipingSystem";
import { PlantArea } from "./PlantArea";
import { PlantInformation } from "./PlantInformation";
import { PolyLine } from "./PolyLine";
import { Position } from "./Position";
import { Presentation } from "./Presentation";
import { ProcessInstrument } from "./ProcessInstrument";
import { Shape } from "./Shape";
import { ShapeCatalogue } from "./ShapeCatalogue";
import { SignalConnectorSymbol } from "./SignalConnectorSymbol";
import { SignalLine } from "./SignalLine";
import { System } from "./System";
import { TrimmedCurve } from "./TrimmedCurve";
import { Text } from "./Text";
import { getElements } from "../utils/getElement";
import { getDrawable } from "../utils/callDrawOnChildren";

/**
 * This is the root node of an XMpLant document and only exists as the root node of an XMpLant file. Other than the first two child elements, PlantInformation and Extent, the ordering of child elements within a PlantModel element is not significant.
 *
 * There shouldn’t be any need to place graphical elements into a PlantModel element as all drawing annotation such as borders and floating text should be child elements of the drawing element.
 *
 * While a Position element may be provided is has no attached semantics and is often defaulted to 0,0,0.
 */
export class PlanModel {
    public readonly isRoot = true;
    public readonly isChild = true;

    public readonly element: Element;

    // children
    public readonly plantInformation: PlantInformation[];
    public readonly extent: Extent[];
    public readonly bSplineCurve: BsplineCurve[];
    public readonly circle: Circle[];
    public readonly compositeCurve: CompositeCurve[];
    public readonly drawing: Drawing[];
    public readonly ellipse: Ellipse[];
    public readonly equipment: Equipment[];
    public readonly genericAttributes: GenericAttributes[];
    public readonly instrumentComponent: InstrumentComponent[];
    public readonly instrumentLoop: InstrumentLoop[];
    public readonly line: Line[];
    public readonly pipingNetworkSystem: PipingNetworkSystem[];
    public readonly pipingSystem: PipingSystem[];
    public readonly plantArea: PlantArea[];
    public readonly polyLine: PolyLine[];
    public readonly position: Position[];
    public readonly presentation: Presentation[];
    public readonly processInstrument: ProcessInstrument[];
    public readonly shape: Shape[];
    public readonly shapeCatalogue: ShapeCatalogue[];
    public readonly signalConnectorSymbol: SignalConnectorSymbol[];
    public readonly signalLine: SignalLine[];
    public readonly system: System[];
    public readonly text: Text[];
    public readonly trimmedCurve: TrimmedCurve[];

    // attributes

    constructor(element: Element) {
        this.element = element;
        this.plantInformation = getElements(element, "PlantInformation", PlantInformation);
        this.extent = getElements(element, "Extent", Extent);
        this.bSplineCurve = getElements(element, "BsplineCurve", BsplineCurve);
        this.circle = getElements(element, "Circle", Circle);
        this.compositeCurve = getElements(element, "CompositeCurve", CompositeCurve);
        this.drawing = getElements(element, "Drawing", Drawing);
        this.ellipse = getElements(element, "Ellipse", Ellipse);
        this.equipment = getElements(element, "Equipment", Equipment);
        this.genericAttributes = getElements(element, "GenericAttributes", GenericAttributes);
        this.instrumentComponent = getElements(element, "InstrumentComponent", InstrumentComponent);
        this.instrumentLoop = getElements(element, "InstrumentLoop", InstrumentLoop);
        this.line = getElements(element, "Line", Line);
        this.pipingNetworkSystem = getElements(element, "PipingNetworkSystem", PipingNetworkSystem);
        this.pipingSystem = getElements(element, "PipingSystem", PipingSystem);
        this.plantArea = getElements(element, "PlantArea", PlantArea);
        this.polyLine = getElements(element, "PolyLine", PolyLine);
        this.position = getElements(element, "Position", Position);
        this.presentation = getElements(element, "Presentation", Presentation);
        this.processInstrument = getElements(element, "ProcessInstrument", ProcessInstrument);
        this.shape = getElements(element, "Shape", Shape);
        this.shapeCatalogue = getElements(element, "ShapeCatalogue", ShapeCatalogue);
        this.signalConnectorSymbol = getElements(
            element,
            "SignalConnectorSymbol",
            SignalConnectorSymbol
        );
        this.signalLine = getElements(element, "SignalLine", SignalLine);
        this.system = getElements(element, "System", System);
        this.text = getElements(element, "Text", Text);
        this.trimmedCurve = getElements(element, "TrimmedCurve", TrimmedCurve);
    }

    draw() {
        const unit = 1000*1.5;
        const x = this.drawing[0].extend[0].max[0].x.value;
        const y = this.drawing[0].extend[0].max[0].y.value;
        const drawables = getDrawable(this);
        drawables.forEach((drawable) => {
            drawable.draw(unit, x, y, 0, 0);
        });
    }
}
