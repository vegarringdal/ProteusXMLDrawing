import { Attribute } from "./Attribute";
import { getChildComponents } from "./getChildComponents";
import { addToShapeCatalogStore, getFromShapeCatalogStore } from "./shapeCatalogStore";
import { drawLine } from "./drawLine";
import { drawShape } from "./drawShape";
import { drawCircle } from "./drawCircle";
import { drawtext } from "./drawText";
import { drawTrimmedCurve } from "./drawTrimmedCurve";
import { drawEllipse } from "./drawEllipse";
import { addToIdStore } from "./idStore";
import { getPaper, PaperGroup } from "./paper";
import { Point } from "paper/dist/paper-core";

export class Component {
    isChild = true;
    tagName: string;
    attributes: Record<string, string> = {};
    GenericAttributes: Component[] = [];
    /*
     * will be in component type of GenericAttributes only...
     */
    GenericAttribute: Component[] = [];
    componentName?: Attribute;
    iD?: Attribute;
    Position: any[] = [];
    Extent: any[] = [];
    Presentation: any[] = [];
    Scale: any[] = [];

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
            root[attributeNameLowercase] = new Attribute(element, attributeName, this);
        });

        if (this.tagName !== "ShapeCatalogue") {
            // need to build a map, so other components can get details
            if (this.isShapeCatalogChild) {
                if (this.componentName?.value) {
                    addToShapeCatalogStore(this.componentName?.value, this);
                }
            }
        }

        if (this.iD?.valueAsString) {
            // need to build a map, so other components can get details

            addToIdStore(this.iD.valueAsString, this);
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
    draw(
        unit: number,
        pageOriginX: number,
        pageOriginY: number,
        offsetX = 0,
        offsetY = 0,
        group: PaperGroup | undefined,
        caller: Component
    ) {
        if (this.tagName === "ShapeCatalogue") {
            // shape catalog should never draw, it will be called by others using componentName
            return;
        }

        if (this.tagName === "TrimmedCurve") {
            drawTrimmedCurve(
                this as any,
                unit,
                pageOriginX,
                pageOriginY,
                offsetX,
                offsetY,
                group,
                caller
            );

            // important - we handle all children in draw function above, so lets return
            return;
        }

        /**
         * draw children
         */
        const drawables = getChildComponents(this);
        drawables.forEach((drawable) => {
            drawable.draw(unit, pageOriginX, pageOriginY, offsetX, offsetY, group, this);
        });

        /**
         * check if anything i shape catalog
         */
        if (this.componentName?.value && this.Position?.length) {
            const shapeCatalogItem = getFromShapeCatalogStore(this.componentName.value);
            if (shapeCatalogItem && shapeCatalogItem !== this) {
                // need to get locatioin, so we can send it as offset

                const Pgroup = getPaper().Group;
                const group = new Pgroup();

                const that = this;
                group.onClick = function () {
                    console.log(that);
                };

                const x = this.Position[0].Location[0].x.valueAsNumber;
                const y = this.Position[0].Location[0].y.valueAsNumber;

                if (typeof (shapeCatalogItem as any).draw === "function") {
                    (shapeCatalogItem as any).draw(
                        unit,
                        pageOriginX,
                        pageOriginY,
                        x + offsetX,
                        y + offsetY,
                        group
                    );
                }

                if (this.Scale.length) {
                    const scaleX = parseFloat(this.Scale[0].attributes.X);
                    const scaleY = parseFloat(this.Scale[0].attributes.Y);
                    if (scaleX !== 1 || scaleY !== 1) {
                        // TODO: this might just be buggy...
                        // not sure why I need that height * 2... something I might be missing earlier? or maybe Im generating with incorrect center  when I draw children?
                        group.scale(scaleX, scaleY, new Point(x, y + group.bounds.height * 2));
                    }
                }

                // only tested on public\TrainingTestCases\tests\E08 ProcessColumn with ColumnSections\E08V01-SAG.EX01.XML

                const xr = this.Position[0]?.Reference[0]?.x?.valueAsNumber
                if (xr && xr !== 1) {
                    group.rotate(
                        (xr / (Math.PI / 180)) * Math.PI, // cos(180) === -1, I dont know if this is 100% correct
                        // why Im not rotating with center.x is just weird... maybe Im generating lines with wrong center ?
                        new Point(group.bounds.x, group.bounds.center.y)
                    );
                }

                const yr = this.Position[0]?.Reference[0]?.y?.valueAsNumber;

                if (yr && yr !== 0) {
                    group.rotate(
                        -(yr / (Math.PI / 90)) * Math.PI, // sin(90) === 1 , I dont know if this is 100% correct
                        // why Im not rotating with center.x is just weird... maybe Im generating lines with wrong center ?
                        new Point(group.bounds.x, group.bounds.center.y)
                    );
                }
  

                const flipY = this.Position[0]?.Axis[0]?.z?.valueAsNumber === -1;
                if (flipY) {
                    console.warn("flipY need improvement", this);
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
            drawLine(this as any, unit, pageOriginX, pageOriginY, offsetX, offsetY, group, caller);
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
            drawCircle(
                this as any,
                unit,
                pageOriginX,
                pageOriginY,
                offsetX,
                offsetY,
                group,
                caller
            );
        }

        /**
         * Ellipse
         */
        if (this.tagName === "Ellipse") {
            drawEllipse(
                this as any,
                unit,
                pageOriginX,
                pageOriginY,
                offsetX,
                offsetY,
                group,
                caller
            );
        }

        /**
         * Shape
         */
        if (this.tagName === "Shape") {
            drawShape(this as any, unit, pageOriginX, pageOriginY, offsetX, offsetY, group, caller);
        }

        /**
         * Text
         */
        if (this.tagName === "Text") {
            drawtext(this as any, unit, pageOriginX, pageOriginY, offsetX, offsetY, group, caller);
        }
    }
}
