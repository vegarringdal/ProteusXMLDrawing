import React from "react";
import "./App.css";
import { ActivateGridDarkTheme } from "./components/ActivateGridDarkTheme";
import { GithubIcon } from "./components/GithubIcon";
import { InfoIcon } from "./components/InfoIcon";
import { LoadingDialog } from "./components/LoadingDialog";
import { OpenXmlFile } from "./components/OpenXmlFile";
import { Selected } from "./components/Selected";
import { TabContent } from "./components/TabContent";
import { TabRow } from "./components/TabRow";
import { guiState } from "./state/guiState";

declare const APP_VERSION: string;

// keep react happy for now...
export function App() {
    const gui = guiState();

    return (
        <div className="flex flex-col h-full bg-gray-900 text-gray-200 min-w-[]">
            <LoadingDialog />
            <ActivateGridDarkTheme />
            <div className="fixed bottom-0 left-0 right-0 text-gray-500 flex flex-col text-sm">
                <span className="m-auto ">
                    No files is uploaded to any third party - all work is done in the browser.
                </span>
                <div className="m-auto italic">
                    LibXml2 - v2.10.2+ latest commit (20 sept - 2022)
                </div>
            </div>
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
            <div className="text-gray-500 pl-2 pr-2 pt-4">
                <TabRow />
            </div>

            {/*  // todo - move into own component */}
            {gui.currentTab === "xsdValidation" ? (
                <>
                    <div className="flex h-full" style={{ minHeight: "0px" }}>
                        <div className="flex flex-1 p-1 pb-10">
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
                        <div className="flex basis-2/3 p-1 pb-10 ">
                            <TabContent></TabContent>
                        </div>

                        <div className="flex basis-1/3  pb-10 pl-1 pr-1">
                            <Selected />
                        </div>
                    </div>
                    <div className="fixed bottom-0 right-0 pr-2 text-gray-500">
                        Version: {APP_VERSION}
                    </div>
                </>
            )}
        </div>
    );
}
export default App;
