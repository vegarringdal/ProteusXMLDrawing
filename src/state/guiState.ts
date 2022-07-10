import create from "zustand";

type State = {
    isLoading: boolean;
    setLoading: (status: boolean) => void;
};

export const guiState = create<State>((set) => ({
    isLoading: false,
    setLoading: (status: boolean) => {
        set(() => {
            return { isLoading: status };
        });
    }
}));
