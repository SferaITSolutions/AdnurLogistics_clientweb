import { create } from 'zustand';


interface GlobalState {
  beforePhone: string;
  setBeforePhone: (v: string) => void;
  isLogout: boolean;
  setIslogout: (v: boolean) => void;
  userInfo: {
    code: string;
    fullname: string;
    phone: string;
  } | null;
  setUserInfo: (userInfo: { code: string; fullname: string; phone: string; } | null) => void;
}

export const useGlobalStore = create<GlobalState>((set) => ({
  beforePhone: '+998',
  setBeforePhone: (val: string) => set({ beforePhone: val }),
  isLogout: false,
  setIslogout: (isLogout) => set({ isLogout }),
  userInfo: null,
  setUserInfo: (userInfo: { code: string; fullname: string; phone: string; } | null) => set({ userInfo: userInfo }),
}));