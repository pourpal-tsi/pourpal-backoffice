"use client";

import { useCallback, useEffect, useState } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/shadcnui/button";
import { LaptopIcon, MoonIcon, SunIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/shadcnui/dropdown-menu";

export default function ThemeToggle({ className }: { className?: string }) {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const resetTheme = useCallback(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme == "dark" || (!storedTheme && prefersDarkMode)) {
      document.body.classList.add("dark");
      setTheme("dark");
    } else {
      document.body.classList.remove("dark");
      setTheme("light");
    }
  }, [prefersDarkMode]);

  useEffect(resetTheme, [resetTheme]);

  const setLightTheme = () => {
    localStorage.setItem("theme", "light");
    document.body.classList.remove("dark");
    setTheme("light");
  };

  const setDarkTheme = () => {
    localStorage.setItem("theme", "dark");
    document.body.classList.add("dark");
    setTheme("dark");
  };

  const setSystemTheme = () => {
    localStorage.removeItem("theme");
    resetTheme();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={className} asChild>
        <Button variant="ghost" size="icon">
          {theme == "dark" ? <MoonIcon /> : <SunIcon />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={setDarkTheme}>
          <MoonIcon className="mr-2 size-4" /> Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={setLightTheme}>
          <SunIcon className="mr-2 size-4" /> Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={setSystemTheme}>
          <LaptopIcon className="mr-2 size-4" /> System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
