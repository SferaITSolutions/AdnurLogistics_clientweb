import { create } from "zustand";

interface SidebarStore {
  isOpen: boolean;
  selectedEntityId: string | null;
  openSidebar: () => void;
  closeSidebar: () => void;
  toggleSidebar: () => void;
  setSelectedEntityId: (id: string | null) => void;
}

export const useSidebarStore = create<SidebarStore>((set) => ({
  isOpen: false,
  selectedEntityId: null,
  openSidebar: () => set({ isOpen: true }),
  closeSidebar: () => set({ isOpen: false }),
  toggleSidebar: () => set((state) => ({ isOpen: !state.isOpen })),
  setSelectedEntityId: (id) => set({ selectedEntityId: id }),
}));