import React from "react";
import { guiState } from "../state/guiState";
import { setXsdContent } from "../state/xsdContent";

export function OpenXsdFile() {
    const gui = guiState();

    return (
        <label className="inline-block p-2 bg-gray-700/50 -10 relative text-center text-indigo-400 font-semibold">
            Open XSD File
            <input
                className=" hidden"
                type="file"
                onChange={(e) => {
                    const reader = new FileReader();
                    reader.onload = () => {
                        // save for later
                        setXsdContent(reader.result as string);
                    };

                    reader.onloadend = () => {
                        gui.setLoading(true);
                    };

                    reader.onerror = () => {
                        // todo
                    };

                    if (e?.target.files) {
                        gui.setLoading(true);
                        guiState.setState({ selectedXsdFileName: e.target.files[0].name });
                        reader.readAsText(e.target.files[0]);
                    }
                }}
            />
        </label>
    );
}
