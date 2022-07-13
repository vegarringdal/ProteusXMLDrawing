import { Component } from "react";
import { getDrawable } from "../utils/callDrawOnChildren";
import { collectMissingParts } from "../utils/findMissing";
import { getElements } from "../utils/getElement";
import { getFromShapeCatalogStore } from "../utils/shapeCatalogStore";
import { StringAttribute } from "../utils/StringAttribute";
import { Association } from "./Association";
import { Circle } from "./Circle";
import { ConnectionPoints } from "./ConnectionPoints";
import { Ellipse } from "./Ellipse";
import { Extent } from "./Extent";
import { GenericAttributes } from "./GenericAttributes";
import { Line } from "./Line";
import { PersistentID } from "./PersistentID";
import { PolyLine } from "./PolyLine";
import { Position } from "./Position";
import { Presentation } from "./Presentation";
import { Text } from "./Text";
import { TrimmedCurve } from "./TrimmedCurve";

/**
 * An offline instrument
 */
export class InstrumentComponent {
    isChild = true;
    element: Element;

    instrumentComponent: InstrumentComponent[];
    component: Component<unknown, unknown, unknown>[];
    line: Line[];
    polyLine: PolyLine[];
    presentation: Presentation[];
    extent: Extent[];
    position: Position[];
    circle: Circle[];
    ellipse: Ellipse[];

    id: StringAttribute;
    componentClass: StringAttribute;
    componentName: StringAttribute;
    componentType: StringAttribute;
    trimmedCurve: TrimmedCurve[];
    text: Text[];
    persistentID: PersistentID[];
    genericAttributes: GenericAttributes[];
    association: Association[];
    connectionPoints: ConnectionPoints[];

    constructor(element: Element) {
        this.element = element;

        this.instrumentComponent = getElements(element, "InstrumentComponent", InstrumentComponent);
        this.component = getElements(element, "Component", Component);
        this.presentation = getElements(element, "Presentation", Presentation);
        this.extent = getElements(element, "Extent", Extent);
        this.position = getElements(element, "Position", Position);
        this.circle = getElements(element, "Circle", Circle);
        this.ellipse = getElements(element, "Ellipse", Ellipse);
        this.line = getElements(element, "Line", Line);
        this.polyLine = getElements(element, "PolyLine", PolyLine);
        this.trimmedCurve = getElements(element, "TrimmedCurve", TrimmedCurve);
        this.text = getElements(element, "Text", Text);
        this.persistentID = getElements(element, "PersistentID", PersistentID);
        this.genericAttributes = getElements(element, "GenericAttributes", GenericAttributes);
        this.association = getElements(element, "Association", Association);
        this.connectionPoints = getElements(element, "ConnectionPoints", ConnectionPoints);

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
