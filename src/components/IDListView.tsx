import React from "react";
import { idListController } from "../state/idListController";
import { SimpleHtmlGrid } from "./SimpleHtmlGrid";

export function IDListView() {
    return (
        <div className="flex-grow">
            <div className="flex flex-row h-full w-full">
                <SimpleHtmlGrid
                    className="simple-html-grid flex-grow"
                    interface={idListController.gridInterFace}
                ></SimpleHtmlGrid>
            </div>
        </div>
    );
}
