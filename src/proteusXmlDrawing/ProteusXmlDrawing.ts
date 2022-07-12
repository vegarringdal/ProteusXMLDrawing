import { PlantModel } from "./children/PlantModel";
import { printMissing } from "./utils/findMissing";
import { initPaper } from "./utils/paper";

export class ProteusXmlDrawing {
    public readonly xml: Document;
    public readonly canvas: HTMLCanvasElement;
    public readonly plantModelElement: Element;
    public readonly plantModel: PlantModel;

    constructor(xmlString: string, canvasId: string) {
        this.xml = new window.DOMParser().parseFromString(xmlString, "text/xml");
        this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;

        initPaper(canvasId);

        this.plantModelElement = this.xml.getElementsByTagName("PlantModel")[0];
        this.plantModel = new PlantModel(this.plantModelElement);
        printMissing()
    }

    public draw() {
        this.plantModel.draw();
    }
}
