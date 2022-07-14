import { getDrawable } from "../utils/callDrawOnChildren";
import { collectMissingParts } from "../utils/findMissing";
import { getElements } from "../utils/getElement";
import { NumberAttribute } from "../utils/NumberAttribute";
import { getPaper } from "../utils/paper";
import { StringAttribute } from "../utils/StringAttribute";
import { Circle } from "./Circle";
import { Ellipse } from "./Ellipse";

/**
 * A geometric primitive
 */
export class TrimmedCurve {
    isChild = true;
    element: Element;
    circle: Circle[];
    startAngle: NumberAttribute;
    endAngle: NumberAttribute;
    ellipse: Ellipse[];

    constructor(element: Element) {
        this.element = element;

        this.circle = getElements(element, "Circle", Circle);
        this.ellipse = getElements(element, "Ellipse", Ellipse);
        this.startAngle = new NumberAttribute(element, "StartAngle");
        this.endAngle = new NumberAttribute(element, "EndAngle");

        collectMissingParts(this.element, this);
    }

    /**
     * draw element/children if any primitives
     * @param unit
     * @param pageOriginX
     * @param pageOriginY
     */
    public draw(unit: number, pageOriginX: number, pageOriginY: number, offsetX = 0, offsetY = 0) {
        // todo, we need to improve these... just draw arc
        const drawables = getDrawable(this);
        drawables.forEach((drawable) => {
            if (drawable.element.tagName === "Circle") {
                const Point = getPaper().Point;
                const Path = getPaper().Path;
                const Color = getPaper().Color;

                const x = (drawable as Circle).position[0].location[0].x.value + offsetX;
                const y = (drawable as Circle).position[0].location[0].y.value + offsetY;
                const point = new Point(x * unit, pageOriginY * unit - y * unit);
                const radius = (drawable as Circle).radius.value * unit;

                /*              
                console.log("---------------------------------------", radius);
                console.log(this.startAngle.value, this.endAngle.value); 
                */

                const startAngle = -this.startAngle.value;
                const endAngle = -this.endAngle.value;

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
                arc.strokeWidth = (drawable as Ellipse).presentation[0].lineWeight.value * unit;
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

                const x = (drawable as Ellipse).position[0].location[0].x.value + offsetX;
                const y = (drawable as Ellipse).position[0].location[0].y.value + offsetY;
                const point = new Point(x * unit, pageOriginY * unit - y * unit);

                const rectangle = new Rectangle(
                    point,
                    new Size(
                        (drawable as Ellipse).primaryAxis.value * unit,
                        (drawable as Ellipse).secondaryAxis.value * unit
                    )
                );
                const ellipse = new Path.Ellipse(rectangle);

                ellipse.strokeColor = new Color({
                    red: (drawable as Ellipse).presentation[0].r.value,
                    green: (drawable as Ellipse).presentation[0].g.value,
                    blue: (drawable as Ellipse).presentation[0].b.value
                });

                ellipse.strokeWidth = (drawable as Ellipse).presentation[0].lineWeight.value * unit;

                if ((drawable as Ellipse).filled.value) {
                    ellipse.fillColor = new Color("black");
                }
            }
        });
    }
}
