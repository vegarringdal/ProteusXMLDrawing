export async function runWorker() {
    const worker = new Worker("xmlvalidateWorker.js");

    console.log("run");
    let xmlContent = "";
    let xsdContent = "";
    const xmlResponse = await fetch("/nocommit/test.xml");

    if (xmlResponse.ok) {
        xmlContent = await xmlResponse.text();
    }
    const xsdResponse = await fetch("/nocommit/test.xsd");
    if (xsdResponse.ok) {
        xsdContent = await xsdResponse.text();
    }

    worker.postMessage({ content: xsdContent, name: "test.xsd" });
    // a filename ending in ".xsd" tells the worker to load the schema
    worker.onmessage = (e) => {
        console.log("answer", e);
        if (e.data.file === "test.xsd" && e.data.loaded) {
            // our schema has been parsed and loaded
            worker.postMessage({ content: xmlContent, name: "test.xml" });
            // a filename not ending in ".xsd" tells the worker to validate
        } else if (e.data.file === "test.xml") {
            // respond to errors
            console.log(e.data);
        }
    };
}

runWorker();
