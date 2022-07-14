import { Drawable } from "./Drawable";

export function getDrawable(ctx: Record<string, any>) {
    const drawable: Drawable[] = [];
    const objectProperties = Object.keys(ctx);
    /* const ctx = this as unknown as Record<string, child>; */
    objectProperties.forEach((prop) => {
        if (Array.isArray(ctx[prop])) {
            ctx[prop].forEach((child: any) => {
                if (child && typeof child.draw === "function") {
                    drawable.push(child);
                }
            });
        }
    });
    return drawable;
}
