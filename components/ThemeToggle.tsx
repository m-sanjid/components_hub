"use client";

import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { IconSun, IconMoon } from "@tabler/icons-react";

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const currentTheme =
      localStorage.getItem("theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light");

    const isDark = currentTheme === "dark";
    setIsDarkMode(isDark);
    root.classList.toggle("dark", isDark);
  }, []);

  const toggleTheme = () => {
    const newTheme = isDarkMode ? "light" : "dark";
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark", !isDarkMode);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <Button variant="ghost" size="sm" onClick={toggleTheme}>
      {isDarkMode ? (
        <IconSun className="h-4 w-4" />
      ) : (
        <IconMoon className="h-4 w-4" />
      )}
    </Button>
  );
};

export default ThemeToggle;
