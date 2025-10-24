import { useState, useEffect } from "react";

/**
 * Custom hook to detect TailwindCSS dark mode (class-based).
 * Works with manual toggle or system preference if you use `class="dark"`.
 */
export const useDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Function to check if dark mode is active
    const checkDarkMode = () =>
      document.documentElement.classList.contains("dark");

    // Initial check
    setIsDarkMode(checkDarkMode());

    // Watch for dark mode class changes
    const observer = new MutationObserver(() => {
      setIsDarkMode(checkDarkMode());
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return isDarkMode;
};
