import { Attribute } from "./Attribute";
import { getChildComponents } from "./getChildComponents";
import { addToShapeCatalogStore, getFromShapeCatalogStore } from "./shapeCatalogStore";
import { drawLine } from "./drawLine";
import { drawShape } from "./drawShape";
import { drawCircle } from "./drawCircle";
import { drawtext } from "./drawText";
import { drawTrimmedCurve } from "./drawTrimmedCurve";
import { drawEllipse } from "./drawEllipse";

export class Component {
    isChild = true;
    tagName: string;
    componentName?: Attribute;
    Position: any[] = [];

    /**
     * Component
     * @param element
     * @param isShapeCatalogChild
     * @param parent
     */
    constructor(
        public element: Element,
        public isShapeCatalogChild: boolean,
        public parent?: Component
    ) {
        this.tagName = this.element.tagName;
        if (this.tagName === "ShapeCatalogue") {
            this.isShapeCatalogChild = true;
        }

        for (let i = 0; i < this.element.children.length; i++) {
            const childElement = this.element.children[i];
            const childTag = childElement.tagName;
            const root = this as any;

            if (!root[childTag]) {
                root[childTag] = [];
            }
            const componentClass = new Component(childElement, this.isShapeCatalogChild, this);
            root[childTag].push(componentClass);
        }

        const attributes = element.getAttributeNames();
        attributes.forEach((attributeName) => {
            const root = this as any;
            // need to keep them as lowercase to be sure we dont crash with component classes
            const attributeNameLowercase =
                attributeName[0].toLowerCase() + attributeName.substring(1, attributeName.length);
            root[attributeNameLowercase] = new Attribute(element, attributeName);
        });

        if (this.tagName !== "ShapeCatalogue") {
            // need to build a map, so other components can get details
            if (this.isShapeCatalogChild) {
                if (this.componentName?.value) {
                    addToShapeCatalogStore(this.componentName?.value, this);
                }
            }
        }
    }

    /**
     * Handles all draw loggic
     * @param unit
     * @param pageOriginX
     * @param pageOriginY
     * @param offsetX - used when its a shape component
     * @param offsetY - used when its a shape component
     * @returns
     */
    draw(unit: number, pageOriginX: number, pageOriginY: number, offsetX = 0, offsetY = 0) {
        if (this.tagName === "ShapeCatalogue") {
            // shape catalog should never draw, it will be called by others using componentName
            return;
        }

        if (this.tagName === "TrimmedCurve") {
            drawTrimmedCurve(this as any, unit, pageOriginX, pageOriginY, offsetX, offsetY);

            // important - we handle all children in draw function above, so lets return
            return;
        }

        /**
         * draw children
         */
        const drawables = getChildComponents(this);
        drawables.forEach((drawable) => {
            drawable.draw(unit, pageOriginX, pageOriginY, offsetX, offsetY);
        });

        /**
         * check if anything i shape catalog
         */
        if (this.componentName?.value && this.Position?.length) {
            const shapeCatalogItem = getFromShapeCatalogStore(this.componentName.value);
            if (shapeCatalogItem && shapeCatalogItem !== this) {
                // need to get locatioin, so we can send it as offset
                const x = this.Position[0].Location[0].x.valueAsNumber;
                const y = this.Position[0].Location[0].y.valueAsNumber;

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

        /**
         * Lines
         */
        if (
            this.tagName === "Line" ||
            this.tagName === "PolyLine" ||
            this.tagName === "CenterLine"
        ) {
            drawLine(this as any, unit, pageOriginX, pageOriginY, offsetX, offsetY);
        }

        /**
         * BsplineCurve
         */
        if (this.tagName === "BsplineCurve") {
            console.warn("BsplineCurve not implemented", this);
        }

        /**
         * CompositeCurve
         */
        if (this.tagName === "CompositeCurve") {
            console.warn("CompositeCurve not implemented", this);
        }

        /**
         * Circle
         */
        if (this.tagName === "Circle") {
            drawCircle(this as any, unit, pageOriginX, pageOriginY, offsetX, offsetY);
        }

        /**
         * Ellipse
         */
        if (this.tagName === "Ellipse") {
            drawEllipse(this as any, unit, pageOriginX, pageOriginY, offsetX, offsetY);
        }

        /**
         * Shape
         */
        if (this.tagName === "Shape") {
            drawShape(this as any, unit, pageOriginX, pageOriginY, offsetX, offsetY);
        }

        /**
         * Text
         */
        if (this.tagName === "Text") {
            drawtext(this as any, unit, pageOriginX, pageOriginY, offsetX, offsetY);
        }
    }
}
