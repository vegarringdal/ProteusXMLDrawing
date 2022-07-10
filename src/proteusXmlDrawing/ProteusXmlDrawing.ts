import { PlanModel } from "./children/PlantModel";
import { initPaper } from "./utils/paper";

export class ProteusXmlDrawing {
    public readonly xml: Document;
    public readonly canvas: HTMLCanvasElement;
    public readonly plantModelElement: Element;
    public readonly plantModel: PlanModel;

    constructor(xmlString: string, canvasId: string) {
        this.xml = new window.DOMParser().parseFromString(xmlString, "text/xml");
        this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
        // just print it for now, need to generate all classes first
 
        initPaper(canvasId);

        this.plantModelElement = this.xml.getElementsByTagName("PlantModel")[0];
        this.plantModel = new PlanModel(this.plantModelElement);
    }

    public draw() {
        this.plantModel.draw();
    }
}
