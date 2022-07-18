import { Circle } from "./types/Circle";
import { getPaper, PaperGroup } from "./paper";
import { Component } from "./Component";
import { debug } from "./debug";

/**
 * used to draw line, polyline and centerline
 * @param ctx
 * @param unit
 * @param pageOriginX
 * @param pageOriginY
 * @param offsetX
 * @param offsetY
 */
export function drawCircle(
    ctx: Circle,
    unit: number,
    pageOriginX: number,
    pageOriginY: number,
    offsetX = 0,
    offsetY = 0,
    group: PaperGroup | undefined,
    caller: Component
) {
    const Point = getPaper().Point;
    const Path = getPaper().Path;
    const Color = getPaper().Color;

    const x = ctx.Position[0].Location[0].x.valueAsNumber + offsetX;
    const y = ctx.Position[0].Location[0].y.valueAsNumber + offsetY;
    const point = new Point(x * unit, pageOriginY * unit - y * unit);

    const myCircle = new Path.Circle(point, ctx.radius.valueAsNumber * unit);
    if (group) {
        group.addChild(myCircle);
    }

    myCircle.strokeColor = new Color({
        red: ctx.Presentation[0].r.value,
        green: ctx.Presentation[0].g.value,
        blue: ctx.Presentation[0].b.value
    });

    myCircle.strokeWidth = ctx.Presentation[0].lineWeight.valueAsNumber * unit;

    if (ctx.filled?.value) {
        myCircle.fillColor = new Color("black");
    }
}
