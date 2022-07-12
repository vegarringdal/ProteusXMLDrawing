import { getElements } from "../utils/getElement";
import { StringAttribute } from "../utils/StringAttribute";
import { Association } from "./Association";
import { BsplineCurve } from "./BsplineCurve";
import { Circle } from "./Circle";
import { CompositeCurve } from "./CompositeCurve";
import { ConnectionPoints } from "./ConnectionPoints";
import { Description } from "./Description";
import { Ellipse } from "./Ellipse";
import { Extent } from "./Extent";
import { GenericAttributes } from "./GenericAttributes";
import { Line } from "./Line";
import { PersistentID } from "./PersistentID";
import { PolyLine } from "./PolyLine";
import { Position } from "./Position";
import { Presentation } from "./Presentation";
import { Scale } from "./Scale";
import { Shape } from "./Shape";
import { TrimmedCurve } from "./TrimmedCurve";
import { Text } from "./Text";
import { getDrawable } from "../utils/callDrawOnChildren";
import { getFromShapeCatalogStore } from "../utils/shapeCatalogStore";
import { collectMissingParts } from "../utils/findMissing";

/**
 * This element is an annotation primitive to represent a label on a P&ID.
 * A Label element inherits elements and attributes from the base type ‘AnnotationItem’.
 * See ‘AnnotationItem’ for the definitions of the inherited contents.
 */
export class Label {
    public readonly element: Element;
    public readonly isChild = true;

    // children
    public readonly presentation: Presentation[];
    public readonly extent: Extent[];
    public readonly persistentID: PersistentID[];
    public readonly position: Position[];
    public readonly scale: Scale[];
    public readonly circle: Circle[];
    public readonly compositeCurve: CompositeCurve[];
    public readonly connectionPoints: ConnectionPoints[];
    public readonly ellipse: Ellipse[];
    public readonly line: Line[];
    public readonly polyLine: PolyLine[];
    public readonly shape: Shape[];
    public readonly trimmedCurve: TrimmedCurve[];
    public readonly bsplineCurve: BsplineCurve[];
    public readonly text: Text[];
    public readonly description: Description[];
    public readonly genericAttributes: GenericAttributes[];
    public readonly history: History[];
    public readonly association: Association[];

    // attributes
    public readonly id: StringAttribute;
    public readonly componentClass: StringAttribute;
    public readonly componentName: StringAttribute;
    public readonly componentType: StringAttribute;
    public readonly revision: StringAttribute;
    public readonly status: StringAttribute;

    constructor(element: Element) {
        this.element = element;

        // children
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

        // attributes
        this.id = new StringAttribute(element, "ID");
        this.componentClass = new StringAttribute(element, "ComponentClass");
        this.componentName = new StringAttribute(element, "ComponentName");
        this.componentType = new StringAttribute(element, "ComponentType");
        this.revision = new StringAttribute(element, "Revision");
        this.status = new StringAttribute(element, "Status");

        // helper to find missing part   // helper to find missing part
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
