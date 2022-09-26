import React, { useEffect } from "react";
import { guiState } from "../state/guiState";

export function CanvasContainer(props: { stayHidden: boolean }) {
    const gui = guiState();

    useEffect(() => {
        // workaround, rreact did not like when I tried this directly
        const canvas = document.getElementById("pidCanvas");
        if (canvas) {
            canvas.setAttribute("resize", "true");
        }
    });

    if (!gui.selectedXmlFileName && !props.stayHidden) {
        return (
            <div className="m-auto flex flex-col items-center text-green-300">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-photo   h-28 w-28"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <line x1={15} y1={8} x2="15.01" y2={8}></line>
                    <rect x={4} y={4} width={16} height={16} rx={3}></rect>
                    <path d="M4 15l4 -4a3 5 0 0 1 3 0l5 5"></path>
                    <path d="M14 14l1 -1a3 5 0 0 1 3 0l2 2"></path>
                </svg>
                <span>Open XML file to get started.</span>
            </div>
        );
    }

    if (props.stayHidden) {
        return (
            <canvas
                id="pidCanvas"
                className="border w-full h-full border-gray-800 hidden  "
            ></canvas>
        );
    }

    return <canvas id="pidCanvas" className="border w-full h-full border-gray-800  "></canvas>;
}
