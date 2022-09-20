import React, { useEffect } from "react";
import "./App.css";
import { getDebug } from "./proteusXmlDrawing/debug";
import { getStore } from "./proteusXmlDrawing/idStore";

import { ProteusXmlDrawing } from "./proteusXmlDrawing/ProteusXmlDrawing";

declare const APP_VERSION: string;

// keep react happy for now...
export function App() {
    useEffect(() => {
        /* 
        
         Only for development, so I dont need to reopen the file for every save..
         sync function run() {
            if (location.host.includes("localhost")) {
                try {
                    const reponse = await fetch("/nocommit/test_1.3.xml");
                    if (reponse.ok) {
                        const text = await reponse.text();
                        const proteusXmlDrawingg = new ProteusXmlDrawing(text as any, "pidCanvas");
                        proteusXmlDrawingg.draw();

                        // helper to find missing IDs at work
                        if (getDebug().printIdMap) {
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
       run(); */
    }, []);

    return (
        <div className="m-2">
            <input
                className=""
                type="file"
                onChange={(e) => {
                    const reader = new FileReader();
                    reader.onload = () => {
                        const proteusXmlDrawingg = new ProteusXmlDrawing(
                            reader.result as any,
                            "pidCanvas"
                        );
                        proteusXmlDrawingg.draw();

                        proteusXmlDrawingg.addEventListener({
                            handleEvent(evt) {
                                console.log(evt.type, evt.data);
                            }
                        });

                        // helper to find missing IDs at work
                        if (getDebug().printIdMap) {
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
            <div className="">Version: {APP_VERSION}</div>
            <div className="text-indigo-600">
                <a href="https://github.com/vegarringdal/ProteusXMLDrawing">Github Repo link</a>
            </div>
            <div className="italic">
                Check console.log for errors/info (F12) in Chrome/Edge if you do not get expected
                result
            </div>
            <div className="italic">Use mousebuttons to pan and mousewheel to zoom</div>
        </div>
    );
}
export default App;
