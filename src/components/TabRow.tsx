import React from "react";
import { guiState } from "../state/guiState";

export function TabRow() {
    const gui = guiState();

    const defaultClass =
        "border-t border-l border-r border-gray-700 p-1 min-w-[10rem]  rounded-t mr-2 bg-gray-800 font-semibold";
    const selectedClass = defaultClass + " text-gray-800 font-semibold bg-gray-300 ";
    const notSelectedClass = defaultClass + " text-indigo-400 font-semibold bg-gray-700/50 ";

    let viewerSelectedClass = notSelectedClass;
    let idListSelectedClass = notSelectedClass;
    let conceptualModelSelectedClass = notSelectedClass;
    let xsdValidationClass = notSelectedClass;

    if (gui.currentTab === "viewer") {
        viewerSelectedClass = selectedClass;
    }

    if (gui.currentTab === "idList") {
        idListSelectedClass = selectedClass;
    }

    if (gui.currentTab === "conceptualModelList") {
        conceptualModelSelectedClass = selectedClass;
    }

    if (gui.currentTab === "xsdValidation") {
        xsdValidationClass = selectedClass;
    }

    return (
        <div className=" border-b border-b-gray-700">
            <button
                className={viewerSelectedClass}
                onClick={() => {
                    guiState.setState({ currentTab: "viewer" });
                }}
            >
                Viewer
            </button>

            <button
                className={conceptualModelSelectedClass}
                onClick={() => {
                    guiState.setState({ currentTab: "conceptualModelList" });
                }}
            >
                Conceptual Model
            </button>

            <button
                className={idListSelectedClass}
                onClick={() => {
                    guiState.setState({ currentTab: "idList" });
                }}
            >
                ID List
            </button>

            <button
                className={xsdValidationClass}
                onClick={() => {
                    guiState.setState({ currentTab: "xsdValidation" });
                }}
            >
                XSD validation
            </button>
        </div>
    );
}
