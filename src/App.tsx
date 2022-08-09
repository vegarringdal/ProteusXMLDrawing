import React from "react";
import "./App.css";

import { ProteusXmlDrawing } from "./proteusXmlDrawing/ProteusXmlDrawing";

// keep react happy for now...
export function App() {
    return (
        <div className="z-20">
            <input
                className="m-2"
                type="file"
                onChange={(e) => {
                    const reader = new FileReader();
                    reader.onload = () => {
                        const proteusXmlDrawing = new ProteusXmlDrawing(reader.result as any, "pidCanvas");
                        proteusXmlDrawing.draw();
                    };

                    reader.onerror = (err) => {};
                    if (e?.target.files) {
                        reader.readAsText(e.target.files[0]);
                    }
                }}
            />
        </div>
    );
}
export default App;
