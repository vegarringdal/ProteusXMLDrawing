import React from "react";
import { Component } from "../proteusXmlDrawing/Component";
import { getStore } from "../proteusXmlDrawing/idStore";
import { ProteusXmlDrawing } from "../proteusXmlDrawing/ProteusXmlDrawing";
import { idListController } from "../state/idListController";
import { guiState } from "../state/guiState";
import { conceptualModelController } from "../state/conceptualModelController";
import { isConceptualModel } from "../utils/isConceptualModel";
import { setXmlContent } from "../state/xmlContent";
import { setXsdContent } from "../state/xsdContent";
import { flushSync } from "react-dom";

export function OpenXmlFile() {
    const gui = guiState();

    return (
        <label className="inline-block p-2 bg-gray-700/50 -10 relative text-center text-indigo-400 font-semibold hover:bg-gray-700">
            Open XML File
            <input
                className=" hidden"
                type="file"
                onChange={(e) => {
                    const reader = new FileReader();
                    reader.onload = () => {
                        // save for later

                        setXmlContent(reader.result as string);
                        setXsdContent("");

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

                        const idListData: {
                            id: string | undefined;
                            elementName: string;
                            tagName: string | null;
                            xpath: string | null;
                            component: Component;
                        }[] = [];

                        const conceptualModelData: {
                            id: string | undefined;
                            elementName: string;
                            tagName: string | null;
                            xpath: string | null;
                            component: Component;
                        }[] = [];

                        idStore.forEach((row) => {
                            let xpath = row.element?.tagName || "";
                            let parent = row.parent || null;
                            while (parent !== null) {
                                xpath = `${parent.element.tagName}/${xpath}`;
                                parent = parent.parent || null;
                            }
                            xpath = `//${xpath}`;

                            if (isConceptualModel(xpath)) {
                                conceptualModelData.push({
                                    id: row.iD?.valueAsString,
                                    elementName: row.element.tagName,
                                    tagName: row.tagName?.valueAsString,
                                    xpath: xpath,
                                    component: row
                                });
                            }

                            // we always add it here..
                            idListData.push({
                                id: row.iD?.valueAsString,
                                elementName: row.element.tagName,
                                tagName: row.tagName?.valueAsString,
                                xpath: xpath,
                                component: row
                            });
                        });

                        idListController.dataSource.setData([]);
                        idListController.dataSource.setData(idListData);
                        idListController.gridInterFace.autoResizeColumns();

                        conceptualModelController.dataSource.setData([]);
                        conceptualModelController.dataSource.setData(conceptualModelData);
                        conceptualModelController.gridInterFace.autoResizeColumns();

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
                        guiState.setState({ currentTab: "viewer" });
                        guiState.setState({
                            selectedXmlFileName: e.target.files[0].name,
                            selectedXsdFileName: ""
                        });
                        reader.readAsText(e.target.files[0]);
                    }
                }}
            />
        </label>
    );
}
