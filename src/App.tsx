import "./App.css";

import { ProteusXmlDrawing } from "./ProteusXmlDrawing/ProteusXmlDrawing";

// keep react happy for now...
export function App() {
    return null;
}
export default App;

// experiment
async function getXml() {
    const response = await fetch("TrainingTestCases/tests/E01 Tank/E01V01-AUD.EX01.xml");
    const xmlstring = await response.text();
    const xmlReader = new ProteusXmlDrawing(xmlstring);
}

getXml();
