"use client";

import { createContext } from "react";

interface ThemeContextType {
    theme: string | null;
    setTheme: (theme: string) => void;
    fontSize: number;
    setFontSize: (size: number) => void;
}

const ThemeContext = createContext<ThemeContextType>({
    theme: "default",
    setTheme: () => { },
    fontSize: 16,
    setFontSize: () => { },
});


export default ThemeContext;