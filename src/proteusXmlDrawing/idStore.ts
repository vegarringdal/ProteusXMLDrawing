import { Component } from "./Component";

const idStore = new Map<string, Component>();

export function addToIdStore(id: string, obj: Component) {
    idStore.set(id, obj);
}

export function getFromIdStore(componentName: string) {
    return idStore.get(componentName) || null;
}
