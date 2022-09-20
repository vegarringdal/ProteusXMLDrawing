import { Component } from "./Component";
import { getDebug, getDebugColor } from "./debug";
import { getShapeFromExtent } from "./drawExtent";
import { getFromIdStore } from "./idStore";
import { getPaper, PaperGroup } from "./paper";
import { ProteusXmlDrawing } from "./ProteusXmlDrawing";
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
    caller: Component,
    proteusXmlDrawing: ProteusXmlDrawing
) {
    const PointText = getPaper().PointText;
    const Point = getPaper().Point;
    const Color = getPaper().Color;
    const Shape = getPaper().Shape;
    const Size = getPaper().Size;

    if (!ctx.Position[0]?.Location) {
        console.warn(
            "unexpected missing location element on text, skipping text",
            ctx?.string?.valueAsString,
            ctx
        );
        return;
    }
    if (!ctx.Extent[0]?.Max) {
        console.warn(
            "unexpected missing Extent element on text, skipping text",
            ctx?.string?.valueAsString,
            ctx
        );
        return;
    }
    if (!ctx.Presentation[0]) {
        console.warn(
            "unexpected missing Presentation element on text, skipping text",
            ctx?.string?.valueAsString,
            ctx
        );
        return;
    }

    // this is just asumption... why call it hidden if you want it..
    if (ctx.Presentation[0].layer?.valueAsString.toUpperCase().includes("HIDDEN")) {
        return;
    }

    const [shapeX, shapeY, shapeWidth, shapeHeight] = getShapeFromExtent(
        ctx as any,
        unit,
        pageOriginX,
        pageOriginY,
        offsetX,
        offsetY,
        getDebug().text,
        getDebugColor().text,
        proteusXmlDrawing
    );

    const x = (ctx.Position[0].Location[0].x.valueAsNumber + offsetX) * unit;
    const y = pageOriginY * unit - (ctx.Position[0].Location[0].y.valueAsNumber + offsetY) * unit;
    const point = new Point(x, y);

    const size = new Size(shapeWidth, shapeHeight);
    const shape = new Shape.Rectangle(new Point(shapeX, shapeY), size);

    const text = new PointText(new Point(x, y));

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

    const cos = ctx.Position[0]?.Reference[0]?.x?.valueAsNumber;
    if (cos && cos !== 1) {
        text.rotate(-(cos / (Math.PI / 180)) * Math.PI, point);
    }

    const sin = ctx.Position[0]?.Reference[0]?.y?.valueAsNumber;
    if (sin && sin !== 0) {
        text.rotate(-(sin / (Math.PI / 90)) * Math.PI, point);
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

    if (group) {
        group.addChild(text);
    } else {
        text.onClick = function () {
            proteusXmlDrawing.publicEvent("onClick", ctx);
        };
    }
}
