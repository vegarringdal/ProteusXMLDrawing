import { Line } from "./types/Line";
import { getPaper, PaperGroup } from "./paper";
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
export function drawLine(
    ctx: Line,
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

    const segments: any[] = [];

    ctx.Coordinate.forEach((coordinate) => {
        const x = coordinate.x.valueAsNumber + offsetX;
        const y = coordinate.y.valueAsNumber + offsetY;
        const point = new Point(x * unit, pageOriginY * unit - y * unit);
        segments.push(point);
    });

    const path = new Path(segments);

    path.strokeColor = new Color({
        red: ctx.Presentation[0].r.value,
        green: ctx.Presentation[0].g.value,
        blue: ctx.Presentation[0].b.value
    });

    switch (ctx.Presentation[0].lineType.valueAsString) {
        case "Solid":
            break;
        case "Dashed":
            path.dashArray = [2, 0.5];
            break;
        case "Dotted":
            path.dashArray = [0.3, 0.3];
            break;
        case "Long Dash":
            path.dashArray = [4, 0.5];
            break;
        case "Long Dash + Short Dash":
            path.dashArray = [4, 0.5, 1, 0.5];
            break;
        case "Short Dash":
            path.dashArray = [1, 0.5];
            break;
        case "Long Dash + Short Dash + Short Dash":
            path.dashArray = [4, 0.5, 1, 0.5, 1, 0.5];
            break;
        default:
            console.error("unknown linetype", ctx);
    }

    path.strokeWidth = ctx.Presentation[0].lineWeight.valueAsNumber * unit;
    if (group) {
        group.addChild(path);
    } else {
        path.onClick = function () {
            console.log(ctx);
        };
    }
}
