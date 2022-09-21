import React, { useEffect } from "react";
import "./App.css";
import { Selected } from "./components/Selected";
import { getDebug } from "./proteusXmlDrawing/debug";
import { getStore } from "./proteusXmlDrawing/idStore";

import { ProteusXmlDrawing } from "./proteusXmlDrawing/ProteusXmlDrawing";
import { guiState } from "./state/guiState";

declare const APP_VERSION: string;

// keep react happy for now...
export function App() {
    const gui = guiState();

    useEffect(() => {
        // workaround, rreact did not like when I tried this directly
        const canvas = document.getElementById("pidCanvas");
        if (canvas) {
            canvas.setAttribute("resize", "true");
        }
    }, []);

    return (
        <div className="p-2 flex flex-col h-full bg-slate-900 text-gray-200">
            <div>
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
                                    gui.setSelected(evt.data);
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

                        reader.onloadend = () => {
                            gui.setLoading(true);
                        };

                        reader.onerror = () => {
                            // todo
                        };

                        if (e?.target.files) {
                            gui.setLoading(true);
                            reader.readAsText(e.target.files[0]);
                        }
                    }}
                />
                <div className="">Version: {APP_VERSION}</div>
                <div className="text-indigo-600">
                    <a href="https://github.com/vegarringdal/ProteusXMLDrawing">Github Repo link</a>
                </div>
                <div className="italic">
                    Check console.log for errors/info (F12) in Chrome/Edge if you do not get
                    expected result
                </div>
                <div className="italic">
                    Use mousebuttons to pan and mousewheel to zoom, click to select (you need to
                    click on text or lines...work in progress)
                </div>
            </div>

            <div className="flex h-full" style={{ minHeight: "0px" }}>
                <div className="flex basis-2/3 p-2">
                    <canvas
                        id="pidCanvas"
                        className="border w-full h-full border-gray-600 "
                    ></canvas>
                </div>

                <div className="flex basis-1/3 p-2">
                    <Selected />
                </div>
            </div>
        </div>
    );
}
export default App;
