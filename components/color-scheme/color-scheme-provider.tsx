"use client";

import { useMediaQuery } from "@/hooks/use-media-query";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export type ColorScheme = "light" | "dark";

const ColorSchemeContext = createContext({
  colorScheme: "light" as ColorScheme,
  setColorScheme: (scheme: ColorScheme | "system"): void => {
    throw new Error(`Trying to set ${scheme} scheme outside of a provider.`);
  },
});

export const useColorScheme = () => useContext(ColorSchemeContext);

export function ColorSchemeProvider({ children }: { children: ReactNode }) {
  const [colorScheme, _setColorScheme] = useState<ColorScheme>("light");

  const prefersDarkScheme = useMediaQuery("(prefers-color-scheme: dark)");
  const resetColorScheme = useCallback(() => {
    const storedTheme = localStorage.getItem("color-scheme");
    if (storedTheme == "dark" || (!storedTheme && prefersDarkScheme)) {
      document.body.classList.add("dark");
      _setColorScheme("dark");
    } else {
      document.body.classList.remove("dark");
      _setColorScheme("light");
    }
  }, [prefersDarkScheme]);

  useEffect(resetColorScheme, [resetColorScheme]);

  const setLightScheme = () => {
    localStorage.setItem("color-scheme", "light");
    document.body.classList.remove("dark");
    _setColorScheme("light");
  };

  const setDarkScheme = () => {
    localStorage.setItem("color-scheme", "dark");
    document.body.classList.add("dark");
    _setColorScheme("dark");
  };

  const setSystemScheme = () => {
    localStorage.removeItem("color-scheme");
    resetColorScheme();
  };

  const setColorScheme = (scheme: ColorScheme | "system") => {
    if (scheme == "dark") {
      setDarkScheme();
    } else if (scheme == "light") {
      setLightScheme();
    } else if (scheme == "system") {
      setSystemScheme();
    }
  };

  return (
    <ColorSchemeContext.Provider value={{ colorScheme, setColorScheme }}>
      {children}
    </ColorSchemeContext.Provider>
  );
}
