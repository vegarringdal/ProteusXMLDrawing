export type Drawable = {
    isChild: boolean;
    draw: (
        unit: number,
        pageOriginX: number,
        pageOriginY: number,
        offsetX: number,
        offsetY: number
    ) => void;
    componentName?: {
        value: string;
    };
};
