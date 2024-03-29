export function validate(
    xmlFileName: string,
    xmlContent: string,
    xsdFileName: string,
    xsdContent: string
) {
    return new Promise((resolve) => {
        const worker = new Worker("xmlvalidateWorker.js");

        const data: any[] = [];

        worker.postMessage({ content: xsdContent, name: xsdFileName });
        // a filename ending in ".xsd" tells the worker to load the schema
        worker.onmessage = (e: any) => {
            let print = true;

            if (e.data.file === xsdFileName && e.data.loaded) {
                // our schema has been parsed and loaded
                print = false;
                worker.postMessage({ content: xmlContent, name: xmlFileName });
                // a filename not ending in ".xsd" tells the worker to validate
            } else if (e.data.file === xmlFileName) {
                // respond to errors
                if (e.data.message) {
                    print = false;
                    data.push({ line: e.data.line, node: e.data.node, message: e.data.message });
                }

                if (e.data.valid !== undefined) {
                    print = false;
                    worker.terminate();
                    resolve(data);
                }
            }

            if (e.data?.includes && e.data?.includes("failed to compile")) {
                console.log(e);
                worker.terminate();
                resolve([{ message: "xsd failed to compile" }]);
            } else {
                // only print if these conditions are meet
                if (print) {
                    console.log(e);
                }
            }
        };
    });
}
