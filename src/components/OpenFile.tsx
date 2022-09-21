import React from "react";
import { Component } from "../proteusXmlDrawing/Component";
import { getStore } from "../proteusXmlDrawing/idStore";
import { ProteusXmlDrawing } from "../proteusXmlDrawing/ProteusXmlDrawing";
import { dataController } from "../state/dataController";
import { guiState } from "../state/guiState";

export function OpenFile() {
    const gui = guiState();

    return (
        <label className="inline-block p-2 bg-gray-700/50 -10 relative text-center text-indigo-400 font-semibold">
            Open File
            <input
                className=" hidden"
                type="file"
                onChange={(e) => {
                    const reader = new FileReader();
                    reader.onload = () => {
                        const proteusXmlDrawing = new ProteusXmlDrawing(
                            reader.result as any,
                            "pidCanvas"
                        );
                        proteusXmlDrawing.draw();

                        proteusXmlDrawing.addEventListener({
                            handleEvent(evt) {
                                gui.setSelected(evt.data);
                            }
                        });

                        const idStore = getStore();

                        const data: {
                            id: string | undefined;
                            elementName: string;
                            tagName: string | null;
                            xpath: string | null;
                            component: Component;
                        }[] = [];

                        idStore.forEach((row) => {
                            data.push({
                                id: row.iD?.valueAsString,
                                elementName: row.element.tagName,
                                tagName: row.tagName?.valueAsString,
                                xpath: null,
                                component: row
                            });
                        });
                        dataController.dataSource.setData([]);
                        dataController.dataSource.setData(data);
                        dataController.gridInterFace.autoResizeColumns();

                        e.target.value = ""; // reset , so reopen is possible
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
        </label>
    );
}
