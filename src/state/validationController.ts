import { Datasource, GridInterface } from "@simple-html/grid";
import { validationGridConfig } from "./validationGridConfig";
import { guiState } from "./guiState";

const dataSource = new Datasource();
const gridInterFace = new GridInterface(validationGridConfig, dataSource);

dataSource.addEventListener({
    handleEvent: (e) => {
        if (e.type === "currentEntity") {
            const node = dataSource.currentEntity?.component;
            guiState.getState().setSelected(node);
        }
        return true; // stay connected, grid always want to disconnect
    }
});

export const validationController = {
    gridInterFace,
    dataSource
};
