import { getDrawable } from "../utils/callDrawOnChildren";
import { getElements } from "../utils/getElement";
import { getFromShapeCatalogStore } from "../utils/shapeCatalogStore";
import { StringAttribute } from "../utils/StringAttribute";
import { Component } from "./Component";
import { Extent } from "./Extent";
import { Line } from "./Line";
import { PolyLine } from "./PolyLine";
import { Position } from "./Position";
import { Presentation } from "./Presentation";
import { Shape } from "./Shape";
import { Nozzle } from "./Nozzle";
import { Circle } from "./Circle";
import { Ellipse } from "./Ellipse";
import { collectMissingParts } from "../utils/findMissing";
import { Text } from "./Text";

/**
 * A geometric primitive
 */
export class Equipment {
    public readonly isChild = true;
    public readonly element: Element;

    // children
    public readonly line: Line[];
    public readonly polyLine: PolyLine[];
    public readonly component: Component[];
    public readonly equipment: Equipment[];
    public readonly presentation: Presentation[];
    public readonly extent: Extent[];
    public readonly position: Position[];
    public readonly shape: Shape[];
    public readonly text: Text[];

    // attributes
    public readonly id: StringAttribute;
    public readonly componentClass: StringAttribute;
    public readonly componentName: StringAttribute;
    public readonly componentType: StringAttribute;
    public readonly nozzle: Nozzle[];
    public readonly circle: Circle[];
    public readonly ellipse: Ellipse[];

    constructor(element: Element) {
        this.element = element;

        // children
        // Discipline
        // MinimumDesignPressure
        // MinimumDesignPressure
        // MinimumDesignTemperature
        // MaximumDesignTemperature
        this.equipment = getElements(element, "Equipment", Equipment);
        this.nozzle = getElements(element, "Nozzle", Nozzle);
        this.component = getElements(element, "Component", Component);

        // children -> plantItem
        this.presentation = getElements(element, "Presentation", Presentation);
        this.extent = getElements(element, "Extent", Extent);
        // PersistentID
        this.position = getElements(element, "Position", Position);
        // Scale
        // Surface
        this.circle = getElements(element, "Circle", Circle);
        // CompositeCurve
        this.ellipse = getElements(element, "Ellipse", Ellipse);
        this.line = getElements(element, "Line", Line);
        this.polyLine = getElements(element, "PolyLine", PolyLine);
        this.shape = getElements(element, "Shape", Shape);
        this.text = getElements(element, "Text", Text);
        // TrimmedCurve
        // BsplineCurve
        // ConnectionPoints
        // PConnectionPoints
        // Identifier
        // Description
        // Weight
        // Material
        // MaterialDescription
        // ModelNumber
        // Supplier
        // Manufacturer
        // GenericAttributes
        // Association
        // History

        // attributes
        // ProcessArea
        // Purpose

        // attributes -> plantItem
        this.id = new StringAttribute(element, "ID");
        // TagName
        // Specification
        // StockNumber
        this.componentClass = new StringAttribute(element, "ComponentClass");
        this.componentName = new StringAttribute(element, "ComponentName");
        this.componentType = new StringAttribute(element, "ComponentType");
        // Revision
        // Status

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
