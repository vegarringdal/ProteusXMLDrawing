import { Component } from "react";
import { getDrawable } from "../utils/callDrawOnChildren";
import { getElements } from "../utils/getElement";
import { getFromShapeCatalogStore } from "../utils/shapeCatalogStore";
import { StringAttribute } from "../utils/StringAttribute";
import { Extent } from "./Extent";
import { Line } from "./Line";
import { PolyLine } from "./PolyLine";
import { Position } from "./Position";
import { Presentation } from "./Presentation";

/**
 * An offline instrument
 */
export class InstrumentComponent {
    public readonly isChild = true;
    public readonly element: Element;

    // children
    public readonly instrumentComponent: InstrumentComponent[];
    public readonly component: Component<unknown, unknown, unknown>[];
    public readonly line: Line[];
    public readonly polyLine: PolyLine[];
    public readonly presentation: Presentation[];
    public readonly extent: Extent[];
    public readonly position: Position[];

    // attributes
    public readonly id: StringAttribute;
    public readonly componentClass: StringAttribute;
    public readonly componentName: StringAttribute;
    public readonly componentType: StringAttribute;

    constructor(element: Element) {
        this.element = element;

        // children
        this.instrumentComponent = getElements(element, "InstrumentComponent", InstrumentComponent);
        // NominalDiameter
        // InsideDiameter
        // OutsideDiameter
        // OperatorType
        // WallThickness
        this.component = getElements(element, "Component", Component);

        // children -> plantItem
        this.presentation = getElements(element, "Presentation", Presentation);
        this.extent = getElements(element, "Extent", Extent);
        // PersistentID
        this.position = getElements(element, "Position", Position);
        // Position
        // Scale
        // Surface
        // Circle
        // CompositeCurve
        // Ellipse
        this.line = getElements(element, "Line", Line);
        this.polyLine = getElements(element, "PolyLine", PolyLine);
        // Shape
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
    }

    /**
     * draw element/children if any primitives
     * @param unit
     * @param pageOriginX
     * @param pageOriginY
     */
    public draw(unit: number, pageOriginX: number, pageOriginY: number) {
        const drawables = getDrawable(this);
        drawables.forEach((drawable) => {
            drawable.draw(unit, pageOriginX, pageOriginY);
        });


        if (this.componentName.value) {
            const shapeCatalogItem = getFromShapeCatalogStore(this.componentName.value);
            if (shapeCatalogItem) {
                console.log("need to draw this item with offset ?");
            }
        }
    }
}
