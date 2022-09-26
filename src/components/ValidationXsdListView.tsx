import React from "react";
import { validationController } from "../state/validationController";
import { OpenXsdFile } from "./OpenXsdFile";
import { SimpleHtmlGrid } from "./SimpleHtmlGrid";

export function ValidationListView() {
    return (
        <div className="flex flex-col h-full w-full flex-grow">
            <div className="pr-2 pl-2 pb-2 ">
                <span className="text-gray-400 italic text-xs">
                    XML Schema Definition or XSD is a recommendation by the World Wide Web
                    Consortium (W3C) to describe and validate the structure and content of an XML
                    document. An XSD is similar to earlier XML schema languages, such as Document
                    Type Definition (DTD), but it is a more powerful alternative as it provides
                    greater control over the XML structure.{" "}
                    <a
                        className="text-indigo-400"
                        href="https://www.w3.org/XML/Schema"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Read more
                    </a>
                </span>

                <div className="flex ">
                    <OpenXsdFile />
                    <div className="w-96 flex ml-3">
                        <a
                            className="text-indigo-400 m-auto"
                            href="https://github.com/ProteusXML/proteusxml"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Click here to find Proteus XSD files (github).
                        </a>
                    </div>
                </div>
            </div>
            <SimpleHtmlGrid
                className="simple-html-grid flex-grow "
                interface={validationController.gridInterFace}
            ></SimpleHtmlGrid>
        </div>
    );
}
