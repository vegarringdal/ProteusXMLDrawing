import React from "react";
import { guiState } from "../state/guiState";

export function TabRow() {
    const gui = guiState();

    const defaultClass = " p-1 min-w-[14rem] font-semibold ";
    const selectedClassBtn = defaultClass + " text-gray-300 font-semibold ";
    const notSelectedClassBtn = defaultClass + " text-indigo-400 font-semibold hover:bg-gray-700 ";
    const selectedClassBottomBorder = " border-b-4 w-full border-indigo-600 ";
    const notSelectedClassBottomBorder = " border-b-4 w-full border-gray-700 ";

    let viewerSelectedClassBtn = notSelectedClassBtn;
    let idListSelectedClassBtn = notSelectedClassBtn;
    let conceptualModelSelectedClassBtn = notSelectedClassBtn;
    let xsdValidationClassBtn = notSelectedClassBtn;

    let viewerSelectedClassBottomBorder = notSelectedClassBottomBorder;
    let idListSelectedClassBottomBorder = notSelectedClassBottomBorder;
    let conceptualModelSelectedClassBottomBorder = notSelectedClassBottomBorder;
    let xsdValidationClassBottomBorder = notSelectedClassBottomBorder;

    if (gui.currentTab === "viewer") {
        viewerSelectedClassBtn = selectedClassBtn;
        viewerSelectedClassBottomBorder = selectedClassBottomBorder;
    }

    if (gui.currentTab === "idList") {
        idListSelectedClassBtn = selectedClassBtn;
        idListSelectedClassBottomBorder = selectedClassBottomBorder;
    }

    if (gui.currentTab === "conceptualModelList") {
        conceptualModelSelectedClassBtn = selectedClassBtn;
        conceptualModelSelectedClassBottomBorder = selectedClassBottomBorder;
    }

    if (gui.currentTab === "xsdValidation") {
        xsdValidationClassBtn = selectedClassBtn;
        xsdValidationClassBottomBorder = selectedClassBottomBorder;
    }

    return (
        <div className=" border-b border-b-gray-700 flex border-gray-800">
            <div className="border-l border-t border-gray-800">
                <button
                    className={viewerSelectedClassBtn}
                    onClick={() => {
                        guiState.setState({ currentTab: "viewer" });
                    }}
                >
                    Viewer
                </button>
                <div className={viewerSelectedClassBottomBorder}></div>
            </div>

            <div className="border-l  border-t border-gray-800">
                <button
                    className={conceptualModelSelectedClassBtn}
                    onClick={() => {
                        guiState.setState({ currentTab: "conceptualModelList" });
                    }}
                >
                    Conceptual Model
                </button>
                <div className={conceptualModelSelectedClassBottomBorder}></div>
            </div>

            <div className="border-l border-t border-gray-800">
                <button
                    className={idListSelectedClassBtn}
                    onClick={() => {
                        guiState.setState({ currentTab: "idList" });
                    }}
                >
                    ID List
                </button>
                <div className={idListSelectedClassBottomBorder}></div>
            </div>

            <div className="border-l border-r border-t border-gray-800">
                <button
                    className={xsdValidationClassBtn}
                    onClick={() => {
                        guiState.setState({ currentTab: "xsdValidation" });
                    }}
                >
                    XSD validation
                </button>
                <div className={xsdValidationClassBottomBorder}></div>
            </div>
        </div>
    );
}
