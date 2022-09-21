import React from "react";
import { guiState } from "../state/guiState";
import { ListView } from "./ListView";

export function TabContent() {
    const gui = guiState();

    if (gui.currentTab === "viewer") {
        return (
            <>
                <canvas id="pidCanvas" className="border w-full h-full border-gray-800 "></canvas>
            </>
        );
    } else {
        // need to do this to remeber context
        return (
            <>
                <canvas
                    id="pidCanvas"
                    className="border w-full h-full border-gray-800 hidden "
                ></canvas>
                <ListView></ListView>
            </>
        );
    }
}
