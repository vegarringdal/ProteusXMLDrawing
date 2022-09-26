import React from "react";
import { conceptualModelController } from "../state/conceptualModelController";
import { SimpleHtmlGrid } from "./SimpleHtmlGrid";

export function ConceptualModeListView() {
    return (
        <div className="flex-grow">
            <div className="flex flex-row h-full w-full">
                <SimpleHtmlGrid
                    className="simple-html-grid flex-grow"
                    interface={conceptualModelController.gridInterFace}
                ></SimpleHtmlGrid>
            </div>
        </div>
    );
}
