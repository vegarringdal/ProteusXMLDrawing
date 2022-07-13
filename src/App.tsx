import "./App.css";

import { ProteusXmlDrawing } from "./proteusXmlDrawing/ProteusXmlDrawing";

// keep react happy for now...
export function App() {
    return null;
}
export default App;

// experiment
async function getXml() {
    const response = await fetch(
        "/TrainingTestCases/tests/C01 the complete DEXPI PnID/C01V01-HEX.EX01.xml"
    );


    const xmlstring = await response.text();
    const proteusXmlDrawing = new ProteusXmlDrawing(xmlstring, "pidCanvas");
    proteusXmlDrawing.draw();
}

getXml();
