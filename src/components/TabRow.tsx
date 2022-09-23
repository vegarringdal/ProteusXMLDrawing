import React from "react";
import { guiState } from "../state/guiState";

export function TabRow() {
    const gui = guiState();

    const defaultClass =
        "border-t border-l border-r border-gray-700 p-1 min-w-[10rem]  rounded-t mr-2 bg-gray-800 font-semibold";
    let viewerSelectedClass;
    let idListSelectedClass;
    let conceptualModelSelectedClass;

    if (gui.currentTab === "viewer") {
        viewerSelectedClass = defaultClass + " text-gray-800 font-semibold bg-gray-300 ";
        idListSelectedClass = defaultClass + " text-indigo-400 font-semibold bg-gray-700/50 ";
        conceptualModelSelectedClass =
            defaultClass + " text-indigo-400 font-semibold bg-gray-700/50 ";
    }

    if (gui.currentTab === "idList") {
        idListSelectedClass = defaultClass + " text-gray-800 font-semibold bg-gray-300 ";
        viewerSelectedClass = defaultClass + " text-indigo-400 font-semibold bg-gray-700/50 ";
        conceptualModelSelectedClass =
            defaultClass + " text-indigo-400 font-semibold bg-gray-700/50 ";
    }

    if (gui.currentTab === "conceptualModelList") {
        conceptualModelSelectedClass = defaultClass + " text-gray-800 font-semibold bg-gray-300 ";
        viewerSelectedClass = defaultClass + " text-indigo-400 font-semibold bg-gray-700/50 ";
        idListSelectedClass = defaultClass + " text-indigo-400 font-semibold bg-gray-700/50 ";
    }

    return (
        <>
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
        </>
    );
}
