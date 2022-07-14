import { ComponentAttribute } from "./ComponentAttribute";
import { getDrawable } from "./callDrawOnChildren";
import { getPaper } from "./paper";
import { addToShapeCatalogStore, getFromShapeCatalogStore } from "./shapeCatalogStore";
import { CooordinateClass } from "./CooordinateClass";
import { PresentationClass } from "./PresentationClass";

export class ComponentClass {
    isChild = true;
    tagName: string;
    componentName?: ComponentAttribute;

    // just add types for help here, might be missing.. make better types later
    Coordinate: CooordinateClass[] = [];
    Presentation: PresentationClass[] = [];
    Position: any[]= []
    Extent: any[]= []

    startAngle!: ComponentAttribute;
    endAngle!: ComponentAttribute;
    radius!: ComponentAttribute;
    filled!: ComponentAttribute;
    string!: ComponentAttribute;
    height!: ComponentAttribute;
    font!: ComponentAttribute;
    textAngle!: ComponentAttribute;
    justification!: ComponentAttribute;


    constructor(public element: Element, public isShapeCatalogChild: boolean) {
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
            const componentClass = new ComponentClass(childElement, this.isShapeCatalogChild);
            root[childTag].push(componentClass);
        }

        const attributes = element.getAttributeNames();
        attributes.forEach((attributeName) => {
            const root = this as any;
            // need to keep them as lowercase to be sure we dont crash with component classes
            const attributeNameLowercase =
                attributeName[0].toLowerCase() + attributeName.substring(1, attributeName.length);
            root[attributeNameLowercase] = new ComponentAttribute(element, attributeName);
        });

        if (this.tagName !== "ShapeCatalogue") {
            if (this.isShapeCatalogChild) {
                if (this.componentName?.value) {
                    addToShapeCatalogStore(this.componentName?.value, this);
                }
            }
        }
    }

    draw(unit: number, pageOriginX: number, pageOriginY: number, offsetX = 0, offsetY = 0) {
        // shape catalog should never draw
        if (this.tagName === "ShapeCatalogue") {
            return;
        }

        if (this.tagName === "TrimmedCurve") {
            const drawables = getDrawable(this);
            drawables.forEach((drawable) => {
                if (drawable.element.tagName === "Circle") {
                    const Point = getPaper().Point;
                    const Path = getPaper().Path;
                    const Color = getPaper().Color;
                    type Circle = any;

                    const x =
                        (drawable as Circle).Position[0].Location[0].x.valueAsNumber + offsetX;
                    const y =
                        (drawable as Circle).Position[0].Location[0].y.valueAsNumber + offsetY;
                    const point = new Point(x * unit, pageOriginY * unit - y * unit);
                    const radius = (drawable as Circle).radius.value * unit;

                    /*              
                    console.log("---------------------------------------", radius);
                    console.log(this.startAngle.value, this.endAngle.value); 
                    */

                    const startAngle = -this.startAngle?.valueAsNumber || 0;
                    const endAngle = -this.endAngle?.valueAsNumber || 0;

                    const from = new Point(radius, 0);
                    from.angle = startAngle;

                    const to = new Point(radius, 0);
                    to.angle = endAngle;

                    const through = new Point(radius, 0);
                    const diff = endAngle - startAngle;
                    through.angle = startAngle + diff / 2;

                    /*           
                    console.log(radius, from.angle, "-->", through.angle, "-->", to.angle);
                    console.log(startAngle, endAngle);
                    console.log(this.element.parentElement); 
                    */

                    const arc = new Path.Arc(from, through, to);
                    arc.strokeColor = new Color("black");
                    arc.strokeWidth = 1;
                    arc.strokeWidth =
                        (drawable as Circle).Presentation[0].lineWeight.valueAsNumber * unit;
                    arc.translate(point);
                }
                if (drawable.element.tagName === "ellipse") {
                    //I dont know how to create this yet
                    console.log("Trimmed curve ellipse not create", this);

                    const Point = getPaper().Point;
                    const Path = getPaper().Path;
                    const Color = getPaper().Color;
                    const Size = getPaper().Size;
                    const Rectangle = getPaper().Rectangle;
                    const Ellipse = getPaper().Shape.Ellipse;
                    type EllipseType = any;

                    const x =
                        (drawable as EllipseType).Position[0].Location[0].x.valueAsNumber + offsetX;
                    const y =
                        (drawable as EllipseType).Position[0].Location[0].y.valueAsNumber + offsetY;
                    const point = new Point(x * unit, pageOriginY * unit - y * unit);

                    const rectangle = new Rectangle(
                        point,
                        new Size(
                            (drawable as EllipseType).primaryAxis.valueAsNumber * unit,
                            (drawable as EllipseType).secondaryAxis.valueAsNumber * unit
                        )
                    );
                    const ellipse = new Path.Ellipse(rectangle);

                    ellipse.strokeColor = new Color({
                        red: (drawable as EllipseType).presentation[0].r.value,
                        green: (drawable as EllipseType).presentation[0].g.value,
                        blue: (drawable as EllipseType).presentation[0].b.value
                    });

                    ellipse.strokeWidth =
                        (drawable as EllipseType).presentation[0].lineWeight.valueAsNumber * unit;

                    if ((drawable as EllipseType).filled?.value) {
                        ellipse.fillColor = new Color("black");
                    }
                }
            });

            // dont continue
            return;
        }

        const drawables = getDrawable(this);
        drawables.forEach((drawable) => {
            drawable.draw(unit, pageOriginX, pageOriginY, offsetX, offsetY);
        });

        /**
         * check if anything i shape catalog
         */
        if (this.componentName?.value && this.Position?.length) {
            const shapeCatalogItem = getFromShapeCatalogStore(this.componentName.value);
            if (shapeCatalogItem && shapeCatalogItem !== this) {
                const x = this.Position[0].Location[0].x.valueAsNumber;
                const y = this.Position[0].Location[0].y.valueAsNumber;
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

        /**
         * Lines
         */

        if (
            this.tagName === "Line" ||
            this.tagName === "PolyLine" ||
            this.tagName === "CenterLine"
        ) {
            const Point = getPaper().Point;
            const Path = getPaper().Path;
            const Color = getPaper().Color;
            const segments: any[] = [];
            this.Coordinate.forEach((coordinate) => {
                const x = coordinate.x.valueAsNumber + offsetX;
                const y = coordinate.y.valueAsNumber + offsetY;
                const point = new Point(x * unit, pageOriginY * unit - y * unit);
                segments.push(point);
            });
            const path = new Path(segments);

            path.strokeColor = new Color({
                red: this.Presentation[0].r.value,
                green: this.Presentation[0].g.value,
                blue: this.Presentation[0].b.value
            });

            path.strokeWidth = this.Presentation[0].lineWeight.valueAsNumber * unit;
        }

        /**
         * Circle
         */

        if (this.tagName === "Circle") {
            const Point = getPaper().Point;
            const Path = getPaper().Path;
            const Color = getPaper().Color;

            const x = this.Position[0].Location[0].x.valueAsNumber + offsetX;
            const y = this.Position[0].Location[0].y.valueAsNumber + offsetY;
            const point = new Point(x * unit, pageOriginY * unit - y * unit);

            const myCircle = new Path.Circle(point, this.radius.valueAsNumber * unit);

            myCircle.strokeColor = new Color({
                red: this.Presentation[0].r.value,
                green: this.Presentation[0].g.value,
                blue: this.Presentation[0].b.value
            });

            myCircle.strokeWidth = this.Presentation[0].lineWeight.valueAsNumber * unit;

            if (this.filled?.value) {
                myCircle.fillColor = new Color("black");
            }
        }

        /**
         * Shape
         */

        if (this.tagName === "Shape") {
            const Point = getPaper().Point;
            const Path = getPaper().Path;
            const Color = getPaper().Color;
            const segments: any[] = [];
            this.Coordinate.forEach((coordinate) => {
                const x = coordinate.x.valueAsNumber + offsetX;
                const y = coordinate.y.valueAsNumber + offsetY;
                const point = new Point(x * unit, pageOriginY * unit - y * unit);
                segments.push(point);
            });
            const path = new Path(segments);

            path.strokeColor = new Color({
                red: this.Presentation[0].r.value,
                green: this.Presentation[0].g.value,
                blue: this.Presentation[0].b.value
            });

            path.strokeWidth = this.Presentation[0].lineWeight.valueAsNumber * unit;
        }
        /**
         * Shape
         */

        if (this.tagName === "Text") {
            const PointText = getPaper().PointText;
            const Point = getPaper().Point;
            const Color = getPaper().Color;
            const x = this.Position[0].Location[0].x.valueAsNumber * unit;
            const y = pageOriginY * unit - this.Position[0].Location[0].y.valueAsNumber * unit;
            const text = new PointText(new Point(x + offsetX * unit, y + offsetY * unit));

            // height and width attribute just cant be right, need to use extent or a combo?
            const width =
                (this.Extent[0].Max[0].x.value - this.Extent[0].Min[0].x.valueAsNumber) * unit;
            const height =
                (this.Extent[0].Max[0].y.value - this.Extent[0].Min[0].y.valueAsNumber) * unit;

            text.content = this.string.valueAsString;
            text.fontSize = this.height.valueAsNumber * unit;
            text.fontFamily = this.font.valueAsString 

            text.fillColor = new Color({
                red: this.Presentation[0].r.value,
                green: this.Presentation[0].g.value,
                blue: this.Presentation[0].b.value
            });

            if (this.textAngle.value) {
                text.rotate(-this.textAngle.valueAsNumber, new Point(x, y));
            }

            // todo, I need to adjust text, but looks like PDF and SVG does not render the same..
            // need to render more before and adjustments, also have no rotation made

            text.bounds.y = text.bounds.y + height / 4;

            switch (this.justification.value) {
                case "LeftTop":
                    break;
                case "LeftCenter":
                    break;
                case "LeftBottom":
                    break;
                case "CenterTop":
                    break;
                case "CenterCenter":
                    break;
                case "CenterBottom":
                    break;
                case "RightTop":
                    break;
                case "RightCenter":
                    break;
                case "RightBottom":
                    break;
                default:
                // LeftBottom
            }
        }
    }
}
