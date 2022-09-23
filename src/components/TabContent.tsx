import React from "react";
import { guiState } from "../state/guiState";
import { CanvasContainer } from "./CanvasContainer";
import { ConceptualModeListView } from "./ConceptualModeListView";
import { IDListView } from "./IDListView";
import { ValidationListView } from "./ValidationXsdListView";

export function TabContent() {
    const gui = guiState();

    if (gui.currentTab === "idList") {
        return (
            <>
                <CanvasContainer stayHidden={true} />
                <IDListView></IDListView>
            </>
        );
    }

    if (gui.currentTab === "conceptualModelList") {
        return (
            <>
                <CanvasContainer stayHidden={true} />
                <ConceptualModeListView></ConceptualModeListView>
            </>
        );
    }

    if (gui.currentTab === "xsdValidation") {
        return (
            <>
                <CanvasContainer stayHidden={true} />
                <ValidationListView></ValidationListView>
            </>
        );
    }

    // need to do this to remeber context

    return (
        <>
            <CanvasContainer stayHidden={false} />
        </>
    );
}
