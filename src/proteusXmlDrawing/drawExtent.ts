import { Extent } from "./types/Extent";
import { getPaper } from "./paper";
import { Color, Point } from "paper/dist/paper-core";

export function getShapeFromExtent(
    ctx: { Extent?: Extent[]; element: HTMLElement },
    unit: number,
    pageOriginX: number,
    pageOriginY: number,
    offsetX = 0,
    offsetY = 0,
    debug: boolean,
    debugColor: { red: number; green: number; blue: number; alpha: number }
) {
    if (ctx?.Extent?.length) {
        const maxX = ctx.Extent[0].Max[0].x.valueAsNumber;
        const minX = ctx.Extent[0].Min[0].x.valueAsNumber;
        const width = (maxX - minX) * unit < 1 ? 1 : (maxX - minX) * unit;

        const maxY = ctx.Extent[0].Max[0].y.valueAsNumber;
        const minY = ctx.Extent[0].Min[0].y.valueAsNumber;
        const height = (maxY - minY) * unit < 1 ? 1 : (maxY - minY) * unit;

        const x = offsetX * unit + minX * unit;
        const y = pageOriginY * unit - (maxY + offsetY) * unit;

        if (debug) {
            const Shape = getPaper().Shape;
            const Size = getPaper().Size;
            const Color = getPaper().Color;

            const size = new Size(width, height);
            const shape = new Shape.Rectangle(new Point(x, y), size);
            shape.fillColor = new Color(debugColor);
            shape.onClick = () => {
                console.log(ctx);
            };
            shape.bringToFront();
        }

        return [x, y, width, height];
    } else {
        return [0, 0, 0, 0];
    }
}