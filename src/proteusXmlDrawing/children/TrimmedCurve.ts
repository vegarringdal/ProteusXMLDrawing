import { getDrawable } from "../utils/callDrawOnChildren";
import { collectMissingParts } from "../utils/findMissing";
import { getElements } from "../utils/getElement";
import { getPaper } from "../utils/paper";
import { Circle } from "./Circle";

/**
 * A geometric primitive
 */
export class TrimmedCurve {
    isChild = true;
    element: Element;
    circle: Circle[];

    constructor(element: Element) {
        this.element = element;

        this.circle = getElements(element, "Circle", Circle);
        // todo ellipse..

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


                // can I modify the circle ?


            }
        });
    }
}
