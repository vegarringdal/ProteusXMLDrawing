import { PlantModel } from "./children/PlantModel";
import { initPaper } from "./utils/paper";

export class ProteusXmlDrawing {
    public readonly xml: Document;
    public readonly canvas: HTMLCanvasElement;
    public readonly plantModelElement: Element;
    public readonly plantModel: PlantModel;

    constructor(xmlString: string, canvasId: string) {
        this.xml = new window.DOMParser().parseFromString(xmlString, "text/xml");
        this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
        // just print it for now, need to generate all classes first

        const f = this.xml.getElementsByTagName("PlantModel");

        for (let i = 0; i < f.length; i++) {
            const u = f[i];

            for (let y = 0; y < u.children.length; y++) {
                const uu = u.children[y];
                console.log(uu.tagName);
            }
        }

        initPaper(canvasId);

        this.plantModelElement = this.xml.getElementsByTagName("PlantModel")[0];
        this.plantModel = new PlantModel(this.plantModelElement);
    }

    public draw() {
        this.plantModel.draw();
    }
}
