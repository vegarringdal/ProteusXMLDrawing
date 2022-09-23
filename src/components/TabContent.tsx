import React from "react";
import { guiState } from "../state/guiState";
import { ConceptualModeListView } from "./ConceptualModeListView";
import { IDListView } from "./IDListView";

export function TabContent() {
    const gui = guiState();

    if (gui.currentTab === "idList") {
        return (
            <>
                <canvas
                    id="pidCanvas"
                    className="border w-full h-full border-gray-800 hidden "
                ></canvas>
                <IDListView></IDListView>
            </>
        );
    }

    if (gui.currentTab === "conceptualModelList") {
        return (
            <>
                <canvas
                    id="pidCanvas"
                    className="border w-full h-full border-gray-800 hidden "
                ></canvas>
                <ConceptualModeListView></ConceptualModeListView>
            </>
        );
    }

    // need to do this to remeber context

    return (
        <>
            <canvas id="pidCanvas" className="border w-full h-full border-gray-800 "></canvas>
        </>
    );
}
