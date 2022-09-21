import React from "react";
import { Component } from "../proteusXmlDrawing/Component";
import { guiState } from "../state/guiState";

export function Selected() {
    const gui = guiState();

    const viewTree: {
        type:
            | "element"
            | "attribute-header"
            | "attribute"
            | "genericAttribute"
            | "genericAttributes";
        name: string;
        value: string;
    }[] = [];

    function parse(component: Component) {
        let currentComp = component;
        let haveParent = true;
        while (haveParent) {
            if (
                !["Text", "Line", "CenterLine", "Shape", "Ellipse", "Circle"].includes(
                    currentComp.elementTagName
                )
            ) {
                if (currentComp.elementTagName) {
                    viewTree.push({
                        type: "element",
                        name: "element",
                        value: currentComp.elementTagName
                    });
                }

                if (currentComp.genericAttributes) {
                    viewTree.push({
                        type: "attribute-header",
                        name: "Attributes",
                        value: ""
                    });
                    const setkeys = Object.keys(currentComp.attributes);
                    setkeys.forEach((setkey) => {
                        viewTree.push({
                            type: "attribute",
                            name: setkey,
                            value: currentComp.attributes[setkey]
                        });
                    });
                }

                if (currentComp.genericAttributes) {
                    const setkeys = Object.keys(currentComp.genericAttributes);
                    setkeys.forEach((setkey) => {
                        viewTree.push({
                            type: "genericAttributes",
                            name: "GenericAttribute Set",
                            value: setkey
                        });
                        const propKeys = Object.keys(currentComp.genericAttributes[setkey]);
                        propKeys.forEach((propKey) => {
                            viewTree.push({
                                type: "genericAttribute",
                                name: propKey,
                                value: currentComp.genericAttributes[setkey][propKey]
                            });
                        });
                    });
                }
            }

            if (currentComp.parent) {
                currentComp = currentComp.parent;
            } else {
                haveParent = false;
            }
        }
    }

    if (!gui.selected?.elementTagName) {
        return (
            <div className="border border-gray-600 detailView flex flex-col text-xs w-full">
                <span className="pl-1 border-b bg-gray-200 border-b-gray-600 text-lg font-bold">
                    Selected Element
                </span>
                nothing selected
            </div>
        );
    }

    console.log(gui.selected);

    parse(gui.selected);

    return (
        <div className="border border-gray-600 detailView flex flex-col text-xs">
            <span className="pl-1 border-b bg-gray-200 border-b-gray-600 text-lg font-bold">
                Selected Element
            </span>
            <div className="flex flex-col overflow-auto " style={{ minHeight: 0 }}>
                {viewTree.map((item, i) => {
                    const key = i + ":" + item.type + "-" + item.name + "-" + item.value;

                    if (item.type === "element") {
                        return (
                            <span
                                key={key}
                                className=" border-b bg-gray-200 border-b-gray-600 sticky top-0 flex "
                            >
                                <span className="pl-1 font-semibold min-w-[254px]">
                                    {item.value}
                                </span>
                            </span>
                        );
                    }

                    if (item.type === "attribute-header") {
                        return (
                            <span
                                key={key}
                                className=" border-b bg-gray-200 border-b-gray-400 flex "
                            >
                                <span className="pl-3 font-semibold min-w-[254px]">
                                    {item.name}
                                </span>
                                <span className="ml-2  ">{item.value}:</span>
                            </span>
                        );
                    }

                    if (item.type === "genericAttributes") {
                        return (
                            <span
                                key={key}
                                className=" border-b bg-gray-200 border-b-gray-400 flex "
                            >
                                <span className="pl-3 font-semibold min-w-[254px]">
                                    {item.name} - {item.value}
                                </span>
                            </span>
                        );
                    }
                    return (
                        <span className="pl-2 border-b border-b-gray-600 flex pr-2" key={key}>
                            <span className="pl-4 font-semibold min-w-[250px]">{item.name}:</span>
                            <span className="ml-2  ">{item.value}:</span>
                        </span>
                    );
                })}
            </div>
        </div>
    );
}
