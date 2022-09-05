import { Component } from "./Component";
import { debug, debugColor } from "./debug";
import { getShapeFromExtent } from "./drawExtent";
import { getPaper, PaperGroup } from "./paper";
import { Ellipse } from "./types/Ellipse";

/**
 * used to draw line, polyline and centerline
 * @param ctx
 * @param unit
 * @param pageOriginX
 * @param pageOriginY
 * @param offsetX
 * @param offsetY
 */
export function drawEllipse(
    ctx: Ellipse,
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
    const Size = getPaper().Size;
    const Rectangle = getPaper().Rectangle;

    const x = ctx.Position[0].Location[0].x.valueAsNumber + offsetX;
    const y = ctx.Position[0].Location[0].y.valueAsNumber + offsetY;

    // todo, add logic for rotatin/flip
    const cos = ctx.Position[0]?.Reference[0]?.x?.valueAsNumber;
    const sin = ctx.Position[0]?.Reference[0]?.x?.valueAsNumber;
    const flipY = ctx.Position[0].Axis[0].z.valueAsNumber === -1;
    if (cos !== 1 || sin !== 0 || flipY) {
        console.log("not implented rotation", ctx, cos, sin, flipY);
    }

    const point = new Point(x * unit, pageOriginY * unit - y * unit);

    const rectangle = new Rectangle(
        point,
        new Size(ctx.primaryAxis.valueAsNumber * unit, ctx.secondaryAxis.valueAsNumber * unit)
    );
    const ellipse = new Path.Ellipse(rectangle);
    if (group) {
        group.addChild(ellipse);
    } else {
        ellipse.onClick = function () {
            console.log(ctx);
        };
    }

    ellipse.strokeColor = new Color({
        red: ctx.Presentation[0].r.value,
        green: ctx.Presentation[0].g.value,
        blue: ctx.Presentation[0].b.value
    });

    ellipse.strokeWidth = ctx.Presentation[0].lineWeight.valueAsNumber * unit;

    if (ctx.filled?.value) {
        ellipse.fillColor = new Color("black");
    }

    getShapeFromExtent(
        ctx as any,
        unit,
        pageOriginX,
        pageOriginY,
        offsetX,
        offsetY,
        debug.circle,
        debugColor.circleArc
    );
}
