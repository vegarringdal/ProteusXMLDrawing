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
                const myCircle = new Path.Circle(point, radius);

                myCircle.strokeColor = new Color({
                    red: (drawable as Circle).presentation[0].r.value,
                    green: (drawable as Circle).presentation[0].g.value,
                    blue: (drawable as Circle).presentation[0].b.value
                });

                myCircle.strokeWidth = (drawable as Circle).presentation[0].lineWeight.value * unit;

                if ((drawable as Circle).filled.value) {
                    myCircle.fillColor = new Color("black");
                }

                /* var path = new Path();
                path.strokeColor = new Color("black");

                path.add(new Point(x, y-radius/2));
                path.arcTo(new Point(x + radius * 2, y-radius/2)); */
            }
            if (drawable.element.tagName === "ellipse") {
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
                    new Size((drawable as Ellipse).primaryAxis.value * unit, (drawable as Ellipse).secondaryAxis.value * unit)
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
