import {create} from "zustand";
import { Component } from "../proteusXmlDrawing/Component";

type State = {
    isLoading: boolean;
    setLoading: (status: boolean) => void;
    setSelected: (selected: Component | null) => void;
    selected: Component | null;
    currentTab: "viewer" | "idList" | "conceptualModelList" | "xsdValidation";
    selectedXmlFileName: string;
    selectedXsdFileName: string;
    loadingMessage: string;
    loadingHeader: string;
};

export const guiState = create<State>((set) => ({
    currentTab: "viewer",
    isLoading: false,
    selectedXmlFileName: "",
    selectedXsdFileName: "",
    loadingMessage: "",
    loadingHeader: "",
    selected: null,
    setLoading: (status: boolean) => {
        set(() => {
            return { isLoading: status };
        });
    },
    setSelected: (selected: Component | null) => {
        set(() => {
            return { selected };
        });
    }
}));
