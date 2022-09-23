import React from "react";
import { guiState } from "../state/guiState";
import { validationController } from "../state/validationController";
import { getXmlContent } from "../state/xmlContent";
import { getXsdContent, setXsdContent } from "../state/xsdContent";
import { validate } from "../utils/validate";

export function OpenXsdFile() {
    const gui = guiState();

    return (
        <label className="inline-block p-2 bg-gray-700/50 -10 relative text-center text-indigo-400 font-semibold hover:bg-gray-700">
            Open XSD File
            <input
                className=" hidden"
                type="file"
                onChange={(e) => {
                    if (!getXmlContent()) {
                        alert("open xml first");
                    }

                    const reader = new FileReader();
                    reader.onload = async () => {
                        // save for later
                        setXsdContent(reader.result as string);
                        const errors = await validate(
                            "test.xml",
                            getXmlContent(),
                            "test.xsd",
                            getXsdContent()
                        );

                        validationController.dataSource.setData([]);
                        validationController.dataSource.setData(errors as []);
                      /*   validationController.gridInterFace.autoResizeColumns(); */
                        e.target.value = ""; // reset , so reopen is possible
                    };

                    reader.onloadend = () => {
                        gui.setLoading(true);
                    };

                    reader.onerror = () => {
                        // todo
                    };

                    if (e?.target.files) {
                        guiState.setState({ currentTab: "xsdValidation" });
                        gui.setLoading(true);
                        guiState.setState({ selectedXsdFileName: e.target.files[0].name });
                        reader.readAsText(e.target.files[0]);
                    }
                }}
            />
        </label>
    );
}
