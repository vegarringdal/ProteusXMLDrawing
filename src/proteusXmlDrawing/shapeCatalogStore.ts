import { Component } from "./Component";

const shapeCatalogStore = new Map<string, Component>();

export function addToShapeCatalogStore(componentName: string, obj: Component) {
    shapeCatalogStore.set(componentName, obj);
}

export function getFromShapeCatalogStore<T>(componentName: string) {
    return shapeCatalogStore.get(componentName) || null;
}
