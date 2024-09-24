"use client";

import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/shadcnui/tooltip";

export default function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)");
    if (storedTheme == "dark" || (!storedTheme && prefersDarkMode)) {
      setTheme("dark");
      document.body.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    document.body.classList.toggle("dark");
    const toggledTheme = theme == "dark" ? "light" : "dark";
    localStorage.setItem("theme", toggledTheme);
    setTheme(toggledTheme);
  };

  return (
    <Tooltip>
      <TooltipTrigger className={className} onClick={toggleTheme}>
        {theme == "dark" ? <MoonIcon /> : <SunIcon />}
      </TooltipTrigger>
      <TooltipContent>
        {theme == "dark" ? "Enable light mode" : "Enable dark mode"}
      </TooltipContent>
    </Tooltip>
  );
}
