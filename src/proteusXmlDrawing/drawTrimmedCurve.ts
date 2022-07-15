import { getPaper } from "./paper";
import { getChildComponents } from "./getChildComponents";
import { Circle } from "./types/Circle";
import { TrimmedCurve } from "./types/TrimmedCurve";

/**
 * used to draw line, polyline and centerline
 * @param ctx
 * @param unit
 * @param pageOriginX
 * @param pageOriginY
 * @param offsetX
 * @param offsetY
 */
export function drawTrimmedCurve(
    ctx: TrimmedCurve,
    unit: number,
    pageOriginX: number,
    pageOriginY: number,
    offsetX = 0,
    offsetY = 0
) {
    const drawables = getChildComponents(ctx);
    drawables.forEach((drawable) => {
        if (drawable.element.tagName === "Circle") {
            const Point = getPaper().Point;
            const Path = getPaper().Path;
            const Color = getPaper().Color;

            const x = (drawable as Circle).Position[0].Location[0].x.valueAsNumber + offsetX;
            const y = (drawable as Circle).Position[0].Location[0].y.valueAsNumber + offsetY;
            const point = new Point(x * unit, pageOriginY * unit - y * unit);
            const radius = (drawable as Circle).radius.valueAsNumber * unit;

            /*              
            console.log("---------------------------------------", radius);
            console.log(ctx.startAngle.value, ctx.endAngle.value); 
            */

            const startAngle = -ctx.startAngle?.valueAsNumber || 0;
            const endAngle = -ctx.endAngle?.valueAsNumber || 0;

            // create vec2 with angle 0 and update it
            const from = new Point(radius, 0);
            from.angle = startAngle;

            // create vec2 with angle 0 and update it
            const to = new Point(radius, 0);
            to.angle = endAngle;

            // create vec2 with angle 0 and update it with position between start and end
            const through = new Point(radius, 0);
            const diff = endAngle - startAngle;
            through.angle = startAngle + diff / 2;

            /*           
            console.log(radius, from.angle, "-->", through.angle, "-->", to.angle);
            console.log(startAngle, endAngle);
            console.log(ctx.element.parentElement); 
            */

            const arc = new Path.Arc(from, through, to);
            arc.strokeColor = new Color("black");
            arc.strokeWidth = (drawable as Circle).Presentation[0].lineWeight.valueAsNumber * unit;
            arc.translate(point);
        }
        if (drawable.element.tagName === "ellipse") {
            //I dont know how to create this yet
            console.warn("Trimmed curve ellipse not implemented", ctx);

            const Point = getPaper().Point;
            const Path = getPaper().Path;
            const Color = getPaper().Color;
            const Size = getPaper().Size;
            const Rectangle = getPaper().Rectangle;
            type EllipseType = any;

            const x = (drawable as EllipseType).Position[0].Location[0].x.valueAsNumber + offsetX;
            const y = (drawable as EllipseType).Position[0].Location[0].y.valueAsNumber + offsetY;
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

    // dont continue, we have the logic for children above...
    return;
}
