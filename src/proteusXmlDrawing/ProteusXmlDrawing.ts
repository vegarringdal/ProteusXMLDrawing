export class ProteusXmlDrawing {
    xml: Document;

    constructor(xmlString: string) {
        this.xml = new window.DOMParser().parseFromString(xmlString, "text/xml");
        // just print it for now, need to generate all classes first
        console.log(this.xml)
    }
}
