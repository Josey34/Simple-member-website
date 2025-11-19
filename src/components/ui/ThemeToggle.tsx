import { Sun, Moon } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";

export const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="btn btn-circle btn-primary fixed bottom-20 right-4 z-[9999] shadow-2xl sm:bottom-24 sm:right-6 md:bottom-6 md:right-6 hover:scale-110 transition-transform"
            aria-label="Toggle theme"
            title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
            {theme === "light" ? (
                <Moon className="w-5 h-5 text-primary-content" />
            ) : (
                <Sun className="w-5 h-5 text-primary-content" />
            )}
        </button>
    );
};
