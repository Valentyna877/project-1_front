import { create } from "zustand";

interface SidebarStore {
  isOpen: boolean;
  isLogoutModalOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  openLogoutModal: () => void;
  closeLogoutModal: () => void;
}

export const useSidebarStore = create<SidebarStore>((set) => ({
  isOpen: false,
  isLogoutModalOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
  openLogoutModal: () => set({ isOpen: false, isLogoutModalOpen: true }),
  closeLogoutModal: () => set({ isLogoutModalOpen: false }),
}));
