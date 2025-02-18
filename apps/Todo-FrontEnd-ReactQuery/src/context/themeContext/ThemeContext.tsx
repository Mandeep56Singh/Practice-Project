import { createContext } from "react";

export type Theme = "light" | "dark";

type ThemeContexttype = {
  theme: Theme;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContexttype | null>(null);
