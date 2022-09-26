import React from "react";
import { Component } from "../proteusXmlDrawing/Component";
import { getStore } from "../proteusXmlDrawing/idStore";
import { ProteusXmlDrawing } from "../proteusXmlDrawing/ProteusXmlDrawing";
import { idListController } from "../state/idListController";
import { guiState } from "../state/guiState";
import { conceptualModelController } from "../state/conceptualModelController";
import { isConceptualModel } from "../utils/isConceptualModel";
import { getXmlContent, setXmlContent } from "../state/xmlContent";
import { getXsdContent, setXsdContent } from "../state/xsdContent";
import { validationController } from "../state/validationController";
import { validate } from "../utils/validate";

export function OpenXmlFile() {
    const gui = guiState();

    return (
        <label className="inline-block p-2 bg-gray-700/50 -10 relative text-center text-indigo-400 font-semibold hover:bg-gray-700">
            Open XML File
            <input
                className=" hidden"
                type="file"
                accept=".xml"
                onChange={(e) => {
                    const reader = new FileReader();
                    reader.onload = async () => {
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

                        // need to clear
                        validationController.dataSource.setData([]);

                        idListController.dataSource.setData([]);
                        idListController.dataSource.setData(idListData);
                        idListController.gridInterFace.autoResizeColumns();

                        conceptualModelController.dataSource.setData([]);
                        conceptualModelController.dataSource.setData(conceptualModelData);
                        conceptualModelController.gridInterFace.autoResizeColumns();

                        const schemaLocation = proteusXmlDrawing.getSchemaLocation();
                        if (!schemaLocation) {
                            guiState.setState({
                                selectedXsdFileName:
                                    "No schema location found, you need to select file manually"
                            });
                        } else {
                            try {
                                const response = await fetch(schemaLocation);
                                if (response.ok) {
                                    const text = await response.text();

                                    setXsdContent(text as string);
                                    const errors = await validate(
                                        "test.xml",
                                        getXmlContent(),
                                        "test.xsd",
                                        getXsdContent()
                                    );

                                    validationController.dataSource.setData([]);
                                    validationController.dataSource.setData(errors as []);
                                    guiState.setState({
                                        selectedXsdFileName: schemaLocation
                                    });
                                } else {
                                    guiState.setState({
                                        selectedXsdFileName: "Unable to download: " + schemaLocation
                                    });
                                }
                            } catch (err) {
                                guiState.setState({
                                    selectedXsdFileName: "Unable to download: " + schemaLocation
                                });
                            }
                        }

                        e.target.value = ""; // reset , so reopen is possible
                    };

                    reader.onloadend = () => {
                        gui.setLoading(false);
                    };

                    reader.onerror = () => {
                        // todo
                    };

                    if (e?.target.files) {
                        guiState.setState({
                            currentTab: "viewer",
                            isLoading: true,
                            loadingHeader: "Reading XML",
                            loadingMessage: "Please wait while we parse and generate graphics"
                        });
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
