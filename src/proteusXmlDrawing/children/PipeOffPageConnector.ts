import { getDrawable } from "../utils/callDrawOnChildren";
import { collectMissingParts } from "../utils/findMissing";
import { getElements } from "../utils/getElement";
import { getFromShapeCatalogStore } from "../utils/shapeCatalogStore";
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
 
    componentClass: StringAttribute;
    componentName: StringAttribute;
    tagName: StringAttribute;
    genericAttributes: GenericAttributes[];
    position: Position[];
    presentation: Presentation[];
    extent: Extent[];
    line: Line[];
    text: Text[];
    pipeOffPageConnectorReference: PipeOffPageConnectorReference[];
    id: StringAttribute;

    constructor(element: Element) {
        this.element = element;
        this.genericAttributes = getElements(element, "GenericAttributes", GenericAttributes);
        this.position = getElements(element, "Position", Position);
        this.presentation = getElements(element, "Presentation", Presentation);
        this.extent = getElements(element, "Extent", Extent);
        this.line = getElements(element, "Line", Line);
        this.text = getElements(element, "Text", Text);
        this.pipeOffPageConnectorReference = getElements(element, "PipeOffPageConnectorReference", PipeOffPageConnectorReference);

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
