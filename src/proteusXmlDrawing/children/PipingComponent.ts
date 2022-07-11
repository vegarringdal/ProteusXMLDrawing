import { Component } from "react";
import { getDrawable } from "../utils/callDrawOnChildren";
import { getElements } from "../utils/getElement";
import { CenterLine } from "./CenterLine";
import { Line } from "./Line";
import { PolyLine } from "./PolyLine";

/**
 * This represents a physical component that is common to piping systems.
 *
 * A PipingComponent element inherits elements and attributes from the base type ‘PlantItem’.
 * See ‘PlantItem’ for the definitions of the inherited contents.
 *
 */
export class PipingComponent {
    public readonly isChild = true;

    // children
    public readonly line: Line[];
    public readonly polyLine: PolyLine[];
    public readonly pipingComponent: PipingComponent[];

    // attributes

    constructor(element: Element) {
        // will only start with geometry elements
        // children **********TODO:***********
        this.pipingComponent = getElements(element, "PipingComponent", PipingComponent);
        // ConnectionType
        // NominalDiameter
        // InsideDiameter
        // OutsideDiameter
        // OperatorType
        // WallThickness
        // FabricationCategory
        // PipingComponent
        // Component
        //
        // children plantItem **********TODO:***********
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
        //
        // attributes  **********TODO:***********
        // ConnectionType
        // Rating
        // Standard
        // ISOSymbol
        //
        // attributes plantItem **********TODO:***********
        // ID
        // TagName
        // Specification
        // StockNumber
        // ComponentClass
        // ComponentName
        // ComponentType
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
