import React from "react";
import { guiState } from "../state/guiState";

export function TabRow() {
    const gui = guiState();

    const defaultClass =
        "border-t border-l border-r border-gray-700 p-1 min-w-[10rem]  rounded-t mr-2 bg-gray-800 font-semibold";
    let viewerSelectedClass;
    let idListSelectedClass;

    if (gui.currentTab === "viewer") {
        viewerSelectedClass = defaultClass + " text-gray-800 font-semibold bg-gray-300 ";
        idListSelectedClass = defaultClass + " text-indigo-400 font-semibold bg-gray-700/50 ";
    } else {
        idListSelectedClass = defaultClass + " text-gray-800 font-semibold bg-gray-300 ";
        viewerSelectedClass = defaultClass + " text-indigo-400 font-semibold bg-gray-700/50 ";
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
