import { create } from "zustand";

interface ResetPasswordFormState {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
  setOldPassword: (value: string) => void;
  setNewPassword: (value: string) => void;
  setConfirmNewPassword: (value: string) => void;
  resetForm: () => void;
}

export const useResetPasswordFormStore = create<ResetPasswordFormState>(
  (set) => ({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
    setOldPassword: (value) => set({ oldPassword: value }),
    setNewPassword: (value) => set({ newPassword: value }),
    setConfirmNewPassword: (value) => set({ confirmNewPassword: value }),
    resetForm: () =>
      set({
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      }),
  })
);

interface ResetModalState {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export const useResetModalStore = create<ResetModalState>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));
