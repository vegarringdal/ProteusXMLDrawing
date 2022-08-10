import { getPaper, PaperGroup } from "./paper";
import { getChildComponents } from "./getChildComponents";
import { Circle } from "./types/Circle";
import { TrimmedCurve } from "./types/TrimmedCurve";
import { Ellipse } from "./types/Ellipse";
import { debug } from "./debug";
import { Component } from "./Component";

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
    offsetY = 0,
    group: PaperGroup | undefined,
    caller: Component
) {
    const drawables = getChildComponents(ctx);
    drawables.forEach((drawable) => {
        if (drawable.element.tagName === "Circle") {
            const Point = getPaper().Point;
            const Path = getPaper().Path;
            const Color = getPaper().Color;

            const comp = drawable as unknown as Circle;

            const x = comp.Position[0].Location[0].x.valueAsNumber + offsetX;
            const y = comp.Position[0].Location[0].y.valueAsNumber + offsetY;

            // todo, add logic for rotatin/flip
            const cos = comp.Position[0].Reference[0].x.valueAsNumber;
            const sin = comp.Position[0].Reference[0].y.valueAsNumber;
            const flipY = comp.Position[0].Axis[0].y.valueAsNumber === -1;
            if (flipY) {
                console.log("not implented rotation", ctx, cos, sin, flipY);
            }

            const point = new Point(x * unit, pageOriginY * unit - y * unit);
            const radius = comp.radius.valueAsNumber * unit;

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
            arc.strokeColor = new Color({
                red: comp.Presentation[0].r.value,
                green: comp.Presentation[0].g.value,
                blue: comp.Presentation[0].b.value
            });

            arc.strokeWidth = comp.Presentation[0].lineWeight.valueAsNumber * unit;
            arc.translate(point);
            // rotate
            if (cos < 0) {
                arc.rotate((cos / (Math.PI / 180)) * Math.PI, point);
            }

            if (sin && sin !== 0) {
                arc.rotate(
                    -(sin / (Math.PI / 90)) * Math.PI,
                    point
                );
            }

            if (group) {
                group.addChild(arc);
            } else {
                arc.onClick = function () {
                    console.log(ctx);
                };
            }

            if (debug.trimmedCurve) {
                const Size = getPaper().Size;
                const Shape = getPaper().Shape;
                const size = new Size(arc.bounds.width, arc.bounds.height);
                const shape = new Shape.Rectangle(new Point(arc.bounds.x, arc.bounds.y), size);
                shape.fillColor = new Color({ red: 1, green: 0, blue: 1, alpha: 0.5 });
                shape.onClick = () => {
                    console.log(ctx);
                };
                shape.bringToFront();
                if (group) {
                    group.addChild(shape);
                }
            }
        }
        if (drawable.element.tagName === "Ellipse") {
            //used circle and scaled it... looks like its working..

            const Point = getPaper().Point;
            const Path = getPaper().Path;
            const Color = getPaper().Color;

            const comp = drawable as unknown as Ellipse;

            const x = comp.Position[0].Location[0].x.valueAsNumber + offsetX;
            const y = comp.Position[0].Location[0].y.valueAsNumber + offsetY;

            // todo, add logic for rotatin/flip
            const cos = comp.Position[0].Reference[0].x.valueAsNumber;
            const sin = comp.Position[0].Reference[0].y.valueAsNumber;
            const flipY = comp.Position[0].Axis[0].z.valueAsNumber === -1;
            if (flipY) {
                console.log("not implented rotation", ctx, cos, sin, flipY);
            }

            const point = new Point(x * unit, pageOriginY * unit - y * unit);
            const radius = comp.primaryAxis.valueAsNumber * unit;

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

            const arc = new Path.Arc(from, through, to);
            arc.strokeColor = new Color({
                red: comp.Presentation[0].r.value,
                green: comp.Presentation[0].g.value,
                blue: comp.Presentation[0].b.value
            });

            arc.strokeWidth = comp.Presentation[0].lineWeight.valueAsNumber * unit;

            arc.translate(point);
            arc.scale(1, (comp.secondaryAxis.valueAsNumber * unit) / radius, point);

            // rotate
            if (cos < 0) {
                arc.rotate((cos / (Math.PI / 180)) * Math.PI, point);
            }

            if (sin && sin !== 0) {
                arc.rotate(
                    -(sin / (Math.PI / 90)) * Math.PI, // sin(90) === 1 , I dont know if this is 100% correct
                    // why Im not rotating with center.x is just weird... maybe Im generating lines with wrong center ?
                    point
                );
            }

            if (group) {
                group.addChild(arc);
            } else {
                arc.onClick = function () {
                    console.log(ctx);
                };
            }

            if (debug.ellipse) {
                const Size = getPaper().Size;
                const Shape = getPaper().Shape;
                const size = new Size(arc.bounds.width, arc.bounds.height);
                const shape = new Shape.Rectangle(new Point(arc.bounds.x, arc.bounds.y), size);
                shape.fillColor = new Color({ red: 1, green: 0, blue: 1, alpha: 0.5 });
                shape.onClick = () => {
                    console.log(ctx);
                };
                shape.bringToFront();
                if (group) {
                    group.addChild(shape);
                }
            }
        }
    });

    // dont continue, we have the logic for children above...
    return;
}
