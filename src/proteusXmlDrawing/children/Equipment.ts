import { getDrawable } from "../utils/callDrawOnChildren";
import { getElements } from "../utils/getElement";
import { StringAttribute } from "../utils/StringAttribute";
import { Component } from "./Component";
import { Line } from "./Line";
import { PolyLine } from "./PolyLine";

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

    // attributes
    public readonly id: StringAttribute;
    public readonly componentClass: StringAttribute;
    public readonly componentName: StringAttribute;
    public readonly componentType: StringAttribute;

    constructor(element: Element) {
        this.element = element;

        // children
        // Discipline
        // MinimumDesignPressure
        // MinimumDesignPressure
        // MinimumDesignTemperature
        // MaximumDesignTemperature
        this.equipment = getElements(element, "Equipment", Equipment);
        // Nozzle
        this.component = getElements(element, "Component", Component);

        // children -> plantItem
        // Presentation
        // Extent
        // PersistentID
        // Extent
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
    }
}
