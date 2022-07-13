import { Component } from "react";
import { getDrawable } from "../utils/callDrawOnChildren";
import { collectMissingParts } from "../utils/findMissing";
import { getElements } from "../utils/getElement";
import { DrawingBorder } from "./DrawingBorder";
import { Extent } from "./Extent";
import { GenericAttributes } from "./GenericAttributes";
import { Label } from "./Label";
import { Line } from "./Line";
import { PolyLine } from "./PolyLine";
import { Presentation } from "./Presentation";
import { Shape } from "./Shape";
import { Text } from "./Text";

/**
 * Metadata and graphical annotation related to the P&ID drawing being represented
 */
export class Drawing {
    isChild = true;
    element: Element;

    drawingBorder: DrawingBorder[];
    extent: Extent[];
    label: Label[];
    presentation: Presentation[];
    genericAttributes: GenericAttributes[];
    text: Text[];
    line: Line[];
    polyLine: PolyLine[];
    shape: Shape[];
    component: Component<unknown, unknown, unknown>[];

    constructor(element: Element) {
        this.element = element;

        this.presentation = getElements(element, "Presentation", Presentation);
        this.extent = getElements(element, "Extent", Extent);
        this.genericAttributes = getElements(element, "GenericAttributes", GenericAttributes);
        this.drawingBorder = getElements(element, "DrawingBorder", DrawingBorder);
        this.label = getElements(element, "Label", Label);
        this.line = getElements(element, "Line", Line);
        this.polyLine = getElements(element, "PolyLine", PolyLine);
        this.text = getElements(element, "Text", Text);
        this.shape = getElements(element, "Shape", Shape);
        this.component = getElements(element, "Component", Component);


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
