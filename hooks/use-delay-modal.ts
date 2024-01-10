import { create } from "zustand";

type DelayModal = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useDelayModal = create<DelayModal>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
