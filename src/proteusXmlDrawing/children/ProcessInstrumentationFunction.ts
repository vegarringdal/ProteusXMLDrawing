import { getDrawable } from "../utils/callDrawOnChildren";
import { collectMissingParts } from "../utils/findMissing";
import { getElements } from "../utils/getElement";
import { getFromShapeCatalogStore } from "../utils/shapeCatalogStore";
import { StringAttribute } from "../utils/StringAttribute";
import { ActuatingFunction } from "./ActuatingFunction";
import { Association } from "./Association";
import { Circle } from "./Circle";
import { Ellipse } from "./Ellipse";
import { Extent } from "./Extent";
import { GenericAttributes } from "./GenericAttributes";
import { InformationFlow } from "./InformationFlow";
import { Line } from "./Line";
import { PersistentID } from "./PersistentID";
import { PolyLine } from "./PolyLine";
import { Position } from "./Position";
import { Presentation } from "./Presentation";
import { Shape } from "./Shape";
import { Text } from "./Text";
import { TrimmedCurve } from "./TrimmedCurve";

/**
 * dunno, assume plant item
 */
export class ProcessInstrumentationFunction {
    isChild = true;
    element: Element;

    line: Line[];
    polyLine: PolyLine[];
    shape: Shape[];
    circle: Circle[];
    ellipse: Ellipse[];
    text: Text[];
    position: Position[];
    actuatingFunction: ActuatingFunction[];
    informationFlow: InformationFlow[];

    id: StringAttribute;
    componentClass: StringAttribute;
    componentName: StringAttribute;
    componentType: StringAttribute;
    trimmedCurve: TrimmedCurve[];
    persistentID: PersistentID[];
    presentation: Presentation[];
    extent: Extent[];
    genericAttributes: GenericAttributes[];
    association: Association[];

    constructor(element: Element) {
        this.element = element;

        this.presentation = getElements(element, "Presentation", Presentation);
        this.extent = getElements(element, "Extent", Extent);
        this.position = getElements(element, "Position", Position);
        this.circle = getElements(element, "Circle", Circle);
        this.ellipse = getElements(element, "Ellipse", Ellipse);
        this.line = getElements(element, "Line", Line);
        this.polyLine = getElements(element, "PolyLine", PolyLine);
        this.shape = getElements(element, "Shape", Shape);
        this.text = getElements(element, "Text", Text);
        this.actuatingFunction = getElements(element, "ActuatingFunction", ActuatingFunction);
        this.informationFlow = getElements(element, "InformationFlow", InformationFlow);
        this.trimmedCurve = getElements(element, "TrimmedCurve", TrimmedCurve);
        this.persistentID = getElements(element, "PersistentID", PersistentID);
        this.genericAttributes = getElements(element, "GenericAttributes", GenericAttributes);
        this.association = getElements(element, "Association", Association);

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
