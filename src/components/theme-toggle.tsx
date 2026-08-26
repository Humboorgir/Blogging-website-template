"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const saved = localStorage.getItem("field-notes-theme");
    const nextDark = saved ? saved === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDark(nextDark);
    document.documentElement.classList.toggle("dark", nextDark);
  }, []);
  function toggle() {
    const nextDark = !dark;
    setDark(nextDark);
    localStorage.setItem("field-notes-theme", nextDark ? "dark" : "light");
    document.documentElement.classList.toggle("dark", nextDark);
  }
  return (
    <Button
      variant="ghost"
      size="icon"
      className="text-muted hover:text-foreground"
      type="button"
      aria-label={dark ? "Use light mode" : "Use dark mode"}
      onClick={toggle}>
      {dark ? <Sun /> : <Moon />}
    </Button>
  );
}
