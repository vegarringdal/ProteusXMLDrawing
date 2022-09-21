import create from "zustand";
import { Component } from "../proteusXmlDrawing/Component";

type State = {
    isLoading: boolean;
    setLoading: (status: boolean) => void;
    setSelected: (selected: Component | null) => void;
    selected: Component | null;
    currentTab: "viewer" | "idList";
};

export const guiState = create<State>((set) => ({
    currentTab: "viewer",
    isLoading: false,
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
