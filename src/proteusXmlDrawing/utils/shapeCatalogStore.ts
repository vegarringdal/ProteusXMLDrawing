import { ShapeCatalogue } from "../children/ShapeCatalogue";

const shapeCatalogStore = new Map<string, any>();

export function addToShapeCatalogStore(componentName: string, obj: any) {
    /*     console.log("shapestore item added", componentName, obj?.element?.tagName); */
    shapeCatalogStore.set(componentName, obj);
}

export function getFromShapeCatalogStore<T>(componentName: string) {
    return (shapeCatalogStore.get(componentName) as T) || null;
}
