import { getDrawable } from "../utils/callDrawOnChildren";
import { collectMissingParts } from "../utils/findMissing";
import { getElements } from "../utils/getElement";
import { StringAttribute } from "../utils/StringAttribute";
import { Association } from "./Association";
import { Circle } from "./Circle";
import { ConnectionPoints } from "./ConnectionPoints";
import { Extent } from "./Extent";
import { GenericAttributes } from "./GenericAttributes";
import { Line } from "./Line";
import { PersistentID } from "./PersistentID";
import { PipeOffPageConnectorReference } from "./PipeOffPageConnectorReference";
import { Position } from "./Position";
import { Presentation } from "./Presentation";
import { Text } from "./Text";


export class PIFDCS {
    isChild = true;
    element: Element;
    genericAttributes: GenericAttributes[];
    position: Position[];
    presentation: Presentation[];
    extent: Extent[];
    line: Line[];
    text: Text[];
    pipeOffPageConnectorReference: PipeOffPageConnectorReference[];
    persistentID: PersistentID[];
    association: Association[];
    circle: Circle[];
    connectionPoints: ConnectionPoints[];
    id: StringAttribute;
    componentClass: StringAttribute;
    componentName: StringAttribute;
    tagName: StringAttribute;

    constructor(element: Element) {
        this.element = element;

        this.genericAttributes = getElements(element, "GenericAttributes", GenericAttributes);
        this.position = getElements(element, "Position", Position);
        this.presentation = getElements(element, "Presentation", Presentation);
        this.extent = getElements(element, "Extent", Extent);
        this.line = getElements(element, "Line", Line);
        this.text = getElements(element, "Text", Text);
        this.pipeOffPageConnectorReference = getElements(element, "PipeOffPageConnectorReference", PipeOffPageConnectorReference);
        this.persistentID = getElements(element, "PersistentID", PersistentID);
        this.association = getElements(element, "Association", Association);
        this.circle = getElements(element, "Circle", Circle);
        this.connectionPoints = getElements(element, "ConnectionPoints", ConnectionPoints);

        this.id = new StringAttribute(element, "ID");
        this.componentClass = new StringAttribute(element, "ComponentClass");
        this.componentName = new StringAttribute(element, "ComponentName");
        this.tagName = new StringAttribute(element, "TagName");

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
