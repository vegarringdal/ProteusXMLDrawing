import React from "react";
import { validationController } from "../state/validationController";
import { SimpleHtmlGrid } from "./SimpleHtmlGrid";

export function ValidationListView() {
    return (
        <div className="flex-grow">
            <div className="flex flex-row h-full w-full">
                <SimpleHtmlGrid
                    className="simple-html-grid flex-grow "
                    interface={validationController.gridInterFace}
                ></SimpleHtmlGrid>
            </div>
        </div>
    );
}
