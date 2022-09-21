import React from "react";
import { dataController } from "../state/dataController";
import { SimpleHtmlGrid } from "./SimpleHtmlGrid";

export function ListView() {
    return (
        <div className="flex-grow">
            <div className="flex flex-row h-full w-full">
                <SimpleHtmlGrid
                    className="simple-html-grid flex-grow m-2 mb-5"
                    interface={dataController.gridInterFace}
                ></SimpleHtmlGrid>
            </div>
        </div>
    );
}