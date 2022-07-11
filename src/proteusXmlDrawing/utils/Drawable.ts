export type Drawable = {
    isChild: boolean;
    draw: (unit: number, pageOriginX: number, pageOriginY: number) => void;
    componentName?: {
        value: string;
    };
};
