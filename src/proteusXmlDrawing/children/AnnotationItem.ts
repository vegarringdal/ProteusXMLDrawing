import { getElements } from "../utils/getElement";
import { BsplineCurve } from "./BsplineCurve";
import { Circle } from "./Circle";
import { CompositeCurve } from "./CompositeCurve";
import { Ellipse } from "./Ellipse";
import { Extent } from "./Extent";
import { GenericAttributes } from "./GenericAttributes";
import { Line } from "./Line";
import { PolyLine } from "./PolyLine";
import { Position } from "./Position";
import { Presentation } from "./Presentation";
import { Shape } from "./Shape";
import { TrimmedCurve } from "./TrimmedCurve";
import { Text } from "./Text";
import { StringAttribute } from "../utils/StringAttribute";
import { PersistentID } from "./PersistentID";
import { Scale } from "./Scale";
import { ConnectionPoints } from "./ConnectionPoints";
import { Description } from "./Description";
import { Association } from "./Association";
import { getDrawable } from "../utils/callDrawOnChildren";
import { collectMissingParts } from "../utils/findMissing";

/**
 * This element is a base abstract type of many elements within an XMpLant file, it defines the
 * common elements and attributes for these items.
 */
export class AnnotationItem {
    element: Element;
    isChild = true;

    presentation: Presentation[];
    extent: Extent[];
    persistentID: PersistentID[];
    position: Position[];
    scale: Scale[];
    circle: Circle[];
    compositeCurve: CompositeCurve[];
    connectionPoints: ConnectionPoints[];
    ellipse: Ellipse[];
    line: Line[];
    polyLine: PolyLine[];
    shape: Shape[];
    trimmedCurve: TrimmedCurve[];
    bsplineCurve: BsplineCurve[];
    text: Text[];
    description: Description[];
    genericAttributes: GenericAttributes[];
    history: History[];
    association: Association[];

    id: StringAttribute;
    componentClass: StringAttribute;
    componentName: StringAttribute;
    componentType: StringAttribute;
    revision: StringAttribute;
    status: StringAttribute;

    constructor(element: Element) {
        this.element = element;

        this.presentation = getElements(element, "Presentation", Presentation);
        this.extent = getElements(element, "Extent", Extent);
        this.persistentID = getElements(element, "PersistentID", PersistentID);
        this.position = getElements(element, "Position", Position);
        this.scale = getElements(element, "Scale", Scale);
        this.circle = getElements(element, "Circle", Circle);
        this.compositeCurve = getElements(element, "CompositeCurve", CompositeCurve);
        this.connectionPoints = getElements(element, "ConnectionPoints", ConnectionPoints);
        this.ellipse = getElements(element, "Ellipse", Ellipse);
        this.line = getElements(element, "Line", Line);
        this.polyLine = getElements(element, "PolyLine", PolyLine);
        this.shape = getElements(element, "Shape", Shape);
        this.trimmedCurve = getElements(element, "TrimmedCurve", TrimmedCurve);
        this.bsplineCurve = getElements(element, "BsplineCurve", BsplineCurve);
        this.text = getElements(element, "Text", Text);
        this.description = getElements(element, "Description", Description);
        this.genericAttributes = getElements(element, "GenericAttributes", GenericAttributes);
        this.history = getElements(element, "History", History);
        this.association = getElements(element, "Association", Association);

        this.id = new StringAttribute(element, "ID");
        this.componentClass = new StringAttribute(element, "ComponentClass");
        this.componentName = new StringAttribute(element, "ComponentName");
        this.componentType = new StringAttribute(element, "ComponentType");
        this.revision = new StringAttribute(element, "Revision");
        this.status = new StringAttribute(element, "Status");

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
