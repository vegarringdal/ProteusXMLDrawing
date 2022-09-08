import { Component } from "./Component";
import { clearStore } from "./idStore";
import { initPaper } from "./paper";

export class ProteusXmlDrawing {
    xml: Document;
    canvas: HTMLCanvasElement;
    PlantModel: any;
    root: boolean;

    constructor(xmlString: string, canvasId: string) {
        this.root = true;
        this.xml = new window.DOMParser().parseFromString(xmlString, "text/xml");
        this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;

        clearStore();

        initPaper(canvasId);

        const plantModelElement = this.xml.getElementsByTagName("PlantModel")[0];
        this.PlantModel = new Component(plantModelElement, false);
    }

    public draw() {
        let unit = 1;

        if (this.PlantModel.PlantInformation[0].units.value === "Metre") {
            unit = 1000;
        }

        if (this.PlantModel.Drawing[0].length === 0) {
            console.warn("No drawing element, skipping");
            return;
        }

        const x = this.PlantModel.Drawing[0].Extent[0].Max[0].x.valueAsNumber;
        const y = this.PlantModel.Drawing[0].Extent[0].Max[0].y.valueAsNumber;
        this.PlantModel.draw(unit, x, y, 0, 0);
    }
}
