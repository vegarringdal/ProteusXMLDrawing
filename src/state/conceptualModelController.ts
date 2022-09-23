import { Datasource, GridInterface } from "@simple-html/grid";
import { defaultGridConfig } from "./defaultGridConfig";
import { guiState } from "./guiState";

const dataSource = new Datasource();
const gridInterFace = new GridInterface(defaultGridConfig, dataSource);

dataSource.addEventListener({
    handleEvent: (e) => {
        if (e.type === "currentEntity") {
            const node = dataSource.currentEntity?.component;
            guiState.getState().setSelected(node);
        }
        return true; // stay connected, grid always want to disconnect
    }
});

export const conceptualModelController = {
    gridInterFace,
    dataSource
};
