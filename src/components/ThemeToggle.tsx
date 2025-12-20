// ThemeToggle.tsx
import React from "react";
import { useTheme } from "./ThemeProvider";
import LightToggle from "./LightToggle"; // Your light bulb component from earlier

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  // Toggle between light and dark
  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      className={`relative focus:outline-none ${className}`}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {/* The full light bulb pull-switch */}
      <LightToggle
      size={110}
      className="hover:scale-110 transition-transform duration-300"
    />

      <span className="sr-only">Toggle theme</span>
    </button>
  );
}