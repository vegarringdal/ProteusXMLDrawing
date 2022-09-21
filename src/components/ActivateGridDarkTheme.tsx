import React from "react";
import { guiState } from "../state/guiState";

export function ActivateGridDarkTheme() {
    const styling = `
        body,
        .simple-html-grid-menu,
        .simple-html-grid {
            --simple-html-grid-main-bg-color: #374151;
            --simple-html-grid-sec-bg-color: #4b5563;
            --simple-html-grid-alt-bg-color: #4b5563;
            --simple-html-grid-main-bg-border: #1f2937;
            --simple-html-grid-sec-bg-border: #1f2937;
            --simple-html-grid-main-bg-selected: #234882;
            --simple-html-grid-main-font-color: #f9f7f7;
            --simple-html-grid-sec-font-color: #979494;
            --simple-html-grid-dropzone-color: #979494;
            --simple-html-grid-grouping-border: #1f2937;
            --simple-html-grid-boxshadow: #4b5563;
            --simple-html-grid-main-hr-border: #4b5563;
        }
        .simple-html-grid ul.dialog-row {
            box-shadow: none;
        
        }
        .simple-html-grid li.dialog-row {
            border-left: 1px dotted rgb(100, 100, 100);
        } 
        .simple-html-grid .grid-edit-button {
            border-color: #374151;
        }
        .simple-html-grid .filter-dialog-bottom-row{
            border-top: 0px;
        }
        .simple-html-grid .filter-dialog-bottom-row button{
            border: 1px solid #515458;
        }
        simple-html-grid-filter-dialog ul input{
            color: var(--simple-html-grid-main-font-color);
            background-color: var(--simple-html-grid-alt-bg-color);
        }
        simple-html-grid-filter-dialog ul textarea{
            color: var(--simple-html-grid-main-font-color);
            background-color: var(--simple-html-grid-alt-bg-color);
        }
    `;

    return <style>{styling}</style>;
}
