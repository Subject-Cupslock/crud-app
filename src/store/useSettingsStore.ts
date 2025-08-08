import { create } from "zustand";

type SettingsState = {
  skipDeleteConfirmation: boolean;
  setSkipDeleteConfirmation: (skip: boolean) => void;
  resetDeleteConfirmation: () => void;
};

export const useSettingsStore = create<SettingsState>((set) => ({
  skipDeleteConfirmation:
    typeof window !== "undefined" &&
    localStorage.getItem("skipDeleteConfirmation") === "true",

  setSkipDeleteConfirmation: (skip) => {
    localStorage.setItem("skipDeleteConfirmation", skip ? "true" : "false");
    set({ skipDeleteConfirmation: skip });
  },

  resetDeleteConfirmation: () => {
    localStorage.removeItem("skipDeleteConfirmation");
    set({ skipDeleteConfirmation: false });
  },
}));
