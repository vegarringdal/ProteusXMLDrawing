import React from "react";
import { guiState } from "../state/guiState";

export function LoadingDialog() {
    const gui = guiState();

    if (!gui.isLoading) {
        return null;
    }

    return (
        <div className="fixed grid w-full h-full items-center justify-center fadeIn z-[7010] bg-gray-800/70 ">
            <div className="block w-96 h-80 bg-gray-800">
                <span className="m-auto block text-center text-2xl  p-2 bg-gray-700 ">
                    Please wait
                </span>
                <div className="block m-2 mt-10">
                    <span className="m-auto block text-center loader "></span>
                </div>
                <span className="m-auto block text-center underline font-semibold ">
                    {gui.loadingHeader}
                </span>
                <span className="m-auto block text-center mt-4 whitespace-pre-line ">
                    {gui.loadingMessage || ""}
                </span>
            </div>
        </div>
    );
}
