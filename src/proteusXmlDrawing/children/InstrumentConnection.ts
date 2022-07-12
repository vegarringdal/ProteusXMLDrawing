import { Component } from "react";
import { getDrawable } from "../utils/callDrawOnChildren";
import { collectMissingParts } from "../utils/findMissing";
import { getElements } from "../utils/getElement";
import { StringAttribute } from "../utils/StringAttribute";
import { CenterLine } from "./CenterLine";
import { Circle } from "./Circle";
import { Ellipse } from "./Ellipse";
import { Label } from "./Label";
import { Line } from "./Line";
import { PipingComponent } from "./PipingComponent";
import { PolyLine } from "./PolyLine";
import { Shape } from "./Shape";

/**
 *This represents a connection for purposes of instrumentation to a process line.  
 Even though this is a topological break this doesn’t terminate the PipingNetworkSegment 
 (see PipingNetworkSegment Topology (Connection element))
 *
 *An InstrumentConnection element inherits elements and attributes from the base type ‘PlantItem’.  
 See ‘PlantItem’ for the definitions of the inherited contents.
 */
export class InstrumentConnection {
    isChild = true;
    element: Element;

    line: Line[];
    polyLine: PolyLine[];
    shape: Shape[];
    circle: Circle[];
    ellipse: Ellipse[];

    id: StringAttribute;
    componentClass: StringAttribute;
    componentName: StringAttribute;
    componentType: StringAttribute;

    constructor(element: Element) {
        this.element = element;

        this.circle = getElements(element, "Circle", Circle);
        this.ellipse = getElements(element, "Ellipse", Ellipse);
        this.line = getElements(element, "Line", Line);
        this.polyLine = getElements(element, "PolyLine", PolyLine);
        this.shape = getElements(element, "Shape", Shape);

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
    }
}
