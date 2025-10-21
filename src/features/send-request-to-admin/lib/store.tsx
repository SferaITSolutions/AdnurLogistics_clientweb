import { create } from "zustand";

type FormRequestValues = {
  fullName: string;
  phone: string;
  uniqueNumber: string;
  from?: string;
  to?: string;
  weight?: number;
  m3?: number;
  density?: number;
  estimatedPrice?: number;
  orderType?: string;
  [key: string]: any;
};

type RequestModalStatus = "idle" | "pending" | "success" | "error";

type FormRequestStore = {
  values: Partial<FormRequestValues>;
  setValue: (name: string, value: any) => void;
  resetForm: () => void;
  requestModalStatus: RequestModalStatus;
  setRequestModalStatus: (status: RequestModalStatus) => void;
};

export const useFormRequestStore = create<FormRequestStore>((set) => ({
  values: {},
  setValue: (name, value) =>
    set((state) => ({
      values: {
        ...state.values,
        [name]: value,
      },
    })),
  resetForm: () => set({ values: {} }),
  requestModalStatus: "idle",
  setRequestModalStatus: (status) => set({ requestModalStatus: status }),
}));
