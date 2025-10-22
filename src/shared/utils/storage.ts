export const setLocalItem = (key: string, item: any) => {
  if (typeof window !== 'undefined') localStorage.setItem(key, item);
};

export const getLocalItem = (key: string) => {
  if (typeof window !== 'undefined') {
    const val = localStorage.getItem(key);
    return val;
  } else return null;
};

export const removeLocalItem = (key: string) => {
  if (typeof window !== 'undefined') localStorage.removeItem(key);
};
