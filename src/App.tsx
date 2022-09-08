import React, { useEffect } from "react";
import "./App.css";
import { debug } from "./proteusXmlDrawing/debug";
import { getStore } from "./proteusXmlDrawing/idStore";

import { ProteusXmlDrawing } from "./proteusXmlDrawing/ProteusXmlDrawing";

declare const APP_VERSION: string;

// keep react happy for now...
export function App() {
    useEffect(() => {
        async function run() {
            if (location.host.includes("localhost")) {
                try {
                    const reponse = await fetch("/nocommit/test_1.3.xml");
                    if (reponse.ok) {
                        const text = await reponse.text();
                        const proteusXmlDrawing = new ProteusXmlDrawing(text as any, "pidCanvas");
                        proteusXmlDrawing.draw();

                        // helper to find missing IDs at work
                        if (debug.printIdMap) {
                            const idStore = getStore();
                            let generatetext = "ID\tELEMENT_NAME\tTAG\r";

                            idStore.forEach((row) => {
                                generatetext =
                                    generatetext +
                                    `${row.iD?.valueAsString}\t${row.element.tagName}\t${row.tagName?.valueAsString}\r`;
                            });
                            console.log(generatetext);
                        }
                    }
                } catch (err) {
                    console.log(err);
                }
            }
        }
        run();
    }, []);

    return (
        <div className="z-20">
            <input
                className="m-2"
                type="file"
                onChange={(e) => {
                    const reader = new FileReader();
                    reader.onload = () => {
                        const proteusXmlDrawing = new ProteusXmlDrawing(
                            reader.result as any,
                            "pidCanvas"
                        );
                        proteusXmlDrawing.draw();

                        // helper to find missing IDs at work
                        if (debug.printIdMap) {
                            const idStore = getStore();
                            let generatetext = "ID\tELEMENT_NAME\tTAG\r";

                            idStore.forEach((row) => {
                                generatetext =
                                    generatetext +
                                    `${row.iD?.valueAsString}\t${row.element.tagName}\t${row.tagName?.valueAsString}\r`;
                            });
                            console.log(generatetext);
                        }
                    };

                    reader.onerror = () => {
                        // todo
                    };
                    if (e?.target.files) {
                        reader.readAsText(e.target.files[0]);
                    }
                }}
            />
            <div className="fixed top-10 ">Version: {APP_VERSION}</div>
            <div className="fixed top-10 ">
                <a href="https://github.com/vegarringdal/ProteusXMLDrawing">Github repo</a>
            </div>
        </div>
    );
}
export default App;
