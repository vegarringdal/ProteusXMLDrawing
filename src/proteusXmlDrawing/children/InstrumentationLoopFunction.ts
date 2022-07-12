import { getDrawable } from "../utils/callDrawOnChildren";
import { collectMissingParts } from "../utils/findMissing";
import { getElements } from "../utils/getElement";
import { StringAttribute } from "../utils/StringAttribute";
import { Association } from "./Association";
import { Circle } from "./Circle";
import { Ellipse } from "./Ellipse";
import { Extent } from "./Extent";
import { GenericAttributes } from "./GenericAttributes";
import { InformationFlow } from "./InformationFlow";
import { Line } from "./Line";
import { PersistentID } from "./PersistentID";
import { PolyLine } from "./PolyLine";
import { Presentation } from "./Presentation";
import { Shape } from "./Shape";
import { SignalConnectorSymbol } from "./SignalConnectorSymbol";
import { SignalLine } from "./SignalLine";

/**
 * A grouped set of instrument detail
 */
export class InstrumentationLoopFunction {
    isChild = true;
    element: Element;

    line: Line[];
    polyLine: PolyLine[];
    signalConnectorSymbol: SignalConnectorSymbol[];
    signalLine: SignalLine[];
    shape: Shape[];
    circle: Circle[];
    ellipse: Ellipse[];
    informationFlow: InformationFlow[];

    id: StringAttribute;
    componentClass: StringAttribute;
    componentName: StringAttribute;
    componentType: StringAttribute;
    persistentID: PersistentID[];
    presentation: Presentation[];
    extent: Extent[];
    genericAttributes: GenericAttributes[];
    association: Association[];

    constructor(element: Element) {
        this.element = element;

        this.presentation = getElements(element, "Presentation", Presentation);
        this.extent = getElements(element, "Extent", Extent);
        this.signalConnectorSymbol = getElements(
            element,
            "SignalConnectorSymbol",
            SignalConnectorSymbol
        );
        this.signalLine = getElements(element, "SignalLine", SignalLine);
        this.circle = getElements(element, "Circle", Circle);
        this.ellipse = getElements(element, "Ellipse", Ellipse);
        this.line = getElements(element, "Line", Line);
        this.polyLine = getElements(element, "PolyLine", PolyLine);
        this.shape = getElements(element, "Shape", Shape);
        this.informationFlow = getElements(element, "InformationFlow", InformationFlow);
        this.persistentID = getElements(element, "PersistentID", PersistentID);
        this.genericAttributes = getElements(element, "GenericAttributes", GenericAttributes);
        this.association = getElements(element, "Association", Association);
        this.id = new StringAttribute(element, "ID");
        this.componentClass = new StringAttribute(element, "ComponentClass");
        this.componentName = new StringAttribute(element, "ComponentName");
        this.componentType = new StringAttribute(element, "ComponentType");

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
