import { Component } from "./Component";
import { debug } from "./debug";
import { getFromIdStore } from "./idStore";
import { getPaper, PaperGroup } from "./paper";
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
    offsetY = 0,
    group: PaperGroup | undefined,
    caller: Component
) {
    const PointText = getPaper().PointText;
    const Point = getPaper().Point;
    const Color = getPaper().Color;
    const Shape = getPaper().Shape;
    const Size = getPaper().Size;

    if (!ctx.Position[0]?.Location) {
        console.warn("unexpected missing location element on text", ctx);
        return;
    }
    if (!ctx.Extent[0]?.Max) {
        console.warn("unexpected missing Extent element on text", ctx);
        return;
    }
    if (!ctx.Presentation[0]) {
        console.warn("unexpected missing Presentation element on text", ctx);
        return;
    }

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
            positionY = positionY;
            break;
        case "LeftCenter":
            positionY = positionY - height / 2;
            break;
        case "LeftBottom":
            positionY = positionY - height;

            break;
        case "CenterTop":
            positionY = positionY;

            positionX = positionX - width / 2;

            break;
        case "CenterCenter":
            positionY = positionY - height / 2;

            positionX = positionX - width / 2;

            break;
        case "CenterBottom":
            positionY = positionY - height;

            positionX = positionX - width;

            break;
        case "RightTop":
            positionY = positionY;

            positionX = positionX + width;

            break;
        case "RightCenter":
            positionY = positionY - height / 2;

            positionX = positionX + width;

            break;
        case "RightBottom":
            positionY = positionY - height;

            positionX = positionX + width;
            break;
    }

    const point = new Point(positionX, positionY);
    const point2 = new Point(positionX, positionY);
    const size = new Size(width, height);
    const shape = new Shape.Rectangle(point, size);

    const text = new PointText(point2);

    text.content = ctx.string?.valueAsString;

    if (text.content === "undefined") {
        if (ctx.attributes.DependantAttribute && ctx.attributes.ItemID) {
            const res = getFromIdStore(ctx.attributes.ItemID);
            if (res) {
                res.GenericAttributes.forEach((e) => {
                    e.GenericAttribute.forEach((e) => {
                        // not sure if all is within beackets,,, but its a starts..
                        if (`[${e.attributes.Name}]` === ctx.attributes.DependantAttribute) {
                            text.content = e.attributes.Value;
                        }
                    });
                });
            }
            if (text.content === "undefined") {
                console.warn(
                    "dependable attribute:",
                    ctx.attributes.DependantAttribute,
                    "not found in ",
                    ctx
                );
            }
        }
    }

    text.fontSize = ctx.height.valueAsNumber * unit;
    text.fontFamily = ctx.font.valueAsString;
    // this might need more logic
    if (ctx.textAngle?.valueAsNumber > 0) {
        text.rotate(-ctx.textAngle.valueAsNumber, new Point(x, y));
    }
    // I dont know how yet
    if (ctx.slantAngle?.valueAsNumber > 0) {
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
        if (group) {
            group.addChild(shape);
        }
    }

    if (group) {
        group.addChild(text);
    } else {
        text.onClick = function () {
            console.log(ctx);
        };
    }

    // todo, I need to adjust text, but looks like PDF and SVG does not render the same..
    // need to render more before and adjustments, also have no rotation made
}
