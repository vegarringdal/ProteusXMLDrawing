import { getDrawable } from "../utils/callDrawOnChildren";
import { collectMissingParts } from "../utils/findMissing";
import { getElements } from "../utils/getElement";
import { StringAttribute } from "../utils/StringAttribute";
import { Extent } from "./Extent";
import { GenericAttributes } from "./GenericAttributes";
import { Line } from "./Line";
import { PipeOffPageConnectorReference } from "./PipeOffPageConnectorReference";
import { Position } from "./Position";
import { Presentation } from "./Presentation";
import { Text } from "./Text";

export class PipeOffPageConnector {
    isChild = true;
    element: Element;
    GenericAttributes: GenericAttributes[];
    Position: Position[];
    Presentation: Presentation[];
    Extent: Extent[];
    Line: Line[];
    text: Text[];
    PipeOffPageConnectorReference: PipeOffPageConnectorReference[];
    id: StringAttribute;
    componentClass: StringAttribute;
    componentName: StringAttribute;
    tagName: StringAttribute;

    constructor(element: Element) {
        this.element = element;
        this.GenericAttributes = getElements(element, "GenericAttributes", GenericAttributes);
        this.Position = getElements(element, "Position", Position);
        this.Presentation = getElements(element, "Presentation", Presentation);
        this.Extent = getElements(element, "Extent", Extent);
        this.Line = getElements(element, "Line", Line);
        this.text = getElements(element, "Text", Text);
        this.PipeOffPageConnectorReference = getElements(element, "PipeOffPageConnectorReference", PipeOffPageConnectorReference);

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
