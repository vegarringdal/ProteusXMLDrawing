import { getDrawable } from "../utils/callDrawOnChildren";
import { collectMissingParts } from "../utils/findMissing";
import { getElements } from "../utils/getElement";
import { StringAttribute } from "../utils/StringAttribute";
import { CenterLine } from "./CenterLine";
import { Circle } from "./Circle";
import { Connection } from "./Connection";
import { Ellipse } from "./Ellipse";
import { Extent } from "./Extent";
import { GenericAttributes } from "./GenericAttributes";
import { Line } from "./Line";
import { PersistentID } from "./PersistentID";
import { PolyLine } from "./PolyLine";
import { Presentation } from "./Presentation";
import { Shape } from "./Shape";
import { SignalConnectorSymbol } from "./SignalConnectorSymbol";

/**
 * A connection between instruments
 */
export class SignalLine {
    isChild = true;
    element: Element;

    line: Line[];
    polyLine: PolyLine[];
    signalConnectorSymbol: SignalConnectorSymbol[];
    signalLine: SignalLine[];
    shape: Shape[];
    circle: Circle[];
    ellipse: Ellipse[];

    id: StringAttribute;
    componentClass: StringAttribute;
    componentName: StringAttribute;
    componentType: StringAttribute;
    revision: StringAttribute;
    status: StringAttribute;
    centerLine: CenterLine[];
    persistentID: PersistentID[];
    genericAttributes: GenericAttributes[];
    presentation: Presentation[];
    extent: Extent[];
    connection: Connection[];

    constructor(element: Element) {
        this.element = element;

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
        this.centerLine = getElements(element, "CenterLine", CenterLine);
        this.persistentID = getElements(element, "PersistentID", PersistentID);
        this.genericAttributes = getElements(element, "GenericAttributes", GenericAttributes);
        this.presentation = getElements(element, "Presentation", Presentation);
        this.extent = getElements(element, "Extent", Extent);
        this.connection = getElements(element, "Shape", Connection);
        this.shape = getElements(element, "Shape", Shape);

        this.id = new StringAttribute(element, "ID");
        this.componentClass = new StringAttribute(element, "ComponentClass");
        this.componentName = new StringAttribute(element, "ComponentName");
        this.componentType = new StringAttribute(element, "ComponentType");
        this.revision = new StringAttribute(element, "Revision");
        this.status = new StringAttribute(element, "Status");


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
    }
}
