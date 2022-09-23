import React, { useEffect } from "react";
import "./App.css";
import { ActivateGridDarkTheme } from "./components/ActivateGridDarkTheme";
import { GithubIcon } from "./components/GithubIcon";
import { InfoIcon } from "./components/InfoIcon";
import { OpenXmlFile } from "./components/OpenXmlFile";
import { OpenXsdFile } from "./components/OpenXsdFile";
import { Selected } from "./components/Selected";
import { TabContent } from "./components/TabContent";
import { TabRow } from "./components/TabRow";
import { guiState } from "./state/guiState";

declare const APP_VERSION: string;

// keep react happy for now...
export function App() {
    const gui = guiState();

    return (
        <div className="p-2 flex flex-col h-full bg-gray-900 text-gray-200">
            <ActivateGridDarkTheme />
            <div className="fixed top-2 right-2  p-2">
                <div className="flex gap-x-2 text-indigo-600">
                    <InfoIcon />
                    <GithubIcon />
                </div>
            </div>
            <div className="p-2 flex">
                <div className="mr-2">
                    <OpenXmlFile />
                </div>
                <div className="mr-2">
                    <OpenXsdFile />
                </div>
                <div className="flex flex-col p-1">
                    <div className="text-xs ">
                        <span className="mr-1 font-bold">XML File:</span>
                        <span>{gui.selectedXmlFileName}</span>
                    </div>
                    <div className="text-xs">
                        <span className="mr-1 font-bold">XSD File:</span>
                        <span>{gui.selectedXsdFileName}</span>
                    </div>
                </div>
            </div>
            <div className="text-gray-500 p-2 pt-4">
                <TabRow />
            </div>

            {/*  // todo - move into own component */}
            {gui.currentTab === "xsdValidation" ? (
                <>
                    <div className="flex h-full" style={{ minHeight: "0px" }}>
                        <div className="flex flex-1  pb-4 p-1">
                            <TabContent></TabContent>
                        </div>
                    </div>
                    <div className="fixed bottom-0 right-0 pr-2 text-gray-500">
                        Version: {APP_VERSION}
                    </div>
                </>
            ) : (
                <>
                    <div className="flex h-full" style={{ minHeight: "0px" }}>
                        <div className="flex basis-2/3  pb-4 p-1">
                            <TabContent></TabContent>
                        </div>

                        <div className="flex basis-1/3 pt-4 pb-4 p-1">
                            <Selected />
                        </div>
                    </div>
                    <div className="fixed bottom-0 right-0 pr-2 text-gray-500">
                        Version: {APP_VERSION}
                    </div>{" "}
                </>
            )}
        </div>
    );
}
export default App;
