import { debug } from "./debug";
import { getPaper } from "./paper";
import { Text } from "./types/Text";

/**
 * used to draw line, polyline and centerline
 * @param ctx
 * @param unit
 * @param pageOriginX
 * @param pageOriginY
 * @param offsetX
 * @param offsetY
 */
export function drawtext(
    ctx: Text,
    unit: number,
    pageOriginX: number,
    pageOriginY: number,
    offsetX = 0,
    offsetY = 0
) {
    const PointText = getPaper().PointText;
    const Point = getPaper().Point;
    const Color = getPaper().Color;
    const Shape = getPaper().Shape;
    const Size = getPaper().Size;
    const x = (ctx.Position[0].Location[0].x.valueAsNumber + offsetX) * unit;
    const y = pageOriginY * unit - (ctx.Position[0].Location[0].y.valueAsNumber + offsetY) * unit;

    const maxX = ctx.Extent[0].Max[0].x.valueAsNumber;
    const minX = ctx.Extent[0].Min[0].x.valueAsNumber;
    const width = (maxX - minX) * unit;

    let positionX = x;
    let positionY = y;

    const maxY = ctx.Extent[0].Max[0].y.valueAsNumber;
    const minY = ctx.Extent[0].Min[0].y.valueAsNumber;
    const height = (maxY - minY) * unit;

    switch (ctx.justification?.value) {
        case "LeftTop":
            positionY = positionY + height / 2;
            break;
        case "LeftCenter":
            positionY = positionY - height / 2;
            break;
        case "LeftBottom":
            positionX = positionX - width;
            break;
        case "CenterTop":
            positionX = positionX - width / 2;
            positionY = positionY + height / 2;
            break;
        case "CenterCenter":
            positionX = positionX - width / 2;

            positionY = positionY - height / 2;
            break;
        case "CenterBottom":
            positionX = positionX - width;
            break;
        case "RightTop":
            positionX = positionX + width / 2;

            positionY = positionY + height / 2;
            break;
        case "RightCenter":
            positionX = positionX + width / 2;

            positionY = positionY - height / 2;
            break;
        case "RightBottom":
            positionX = positionX + width / 2;
            positionX = positionX - width;
            break;
        default:
        // LeftBottom
    }

    const point = new Point(positionX, positionY);
    const point2 = new Point(positionX, positionY);
    const size = new Size(width, height);
    const shape = new Shape.Rectangle(point, size);

    const text = new PointText(point2);

    text.content = ctx.string.valueAsString;
    text.fontSize = ctx.height.valueAsNumber * unit;
    text.fontFamily = ctx.font.valueAsString;
    // this might need more logic
    if (ctx.textAngle?.value) {
        text.rotate(-ctx.textAngle.valueAsNumber, new Point(x, y));
    }
    // I dont know how yet
    if (ctx.slantAngle?.value) {
        console.warn("Text slantAngle not implemented", ctx);
    }

    // move text
    text.bounds.y = shape.bounds.y;
    text.bounds.x = shape.bounds.x;
    text.fitBounds(shape.bounds);

    text.fillColor = new Color({
        red: ctx.Presentation[0].r.value,
        green: ctx.Presentation[0].g.value,
        blue: ctx.Presentation[0].b.value
    });

    if (debug.text) {
        // helper for debugging
        shape.fillColor = new Color({ red: 0, green: 0, blue: 1, alpha: 0.5 });
        shape.onClick = () => {
            console.log(ctx);
        };
        shape.bringToFront();
    }

    // todo, I need to adjust text, but looks like PDF and SVG does not render the same..
    // need to render more before and adjustments, also have no rotation made
}
