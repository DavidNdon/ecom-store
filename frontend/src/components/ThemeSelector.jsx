import { PaletteIcon } from "lucide-react";
import React from "react";
import { THEMES } from "../constants";
import { useThemeStore } from "../store/ThemeStore";

export const ThemeSelector = () => {
  const theme = useThemeStore((s) => s.theme);
  const setTheme = useThemeStore((s) => s.setTheme);

  const handleSelect = (name) => {
    setTheme(name);
  };

  return (
    <div className="dropdown dropdown-end ">
      <button tabIndex={0} className="btn btn-ghost btn-circle">
        <PaletteIcon className="size-5" />
      </button>

      <div
        tabIndex={0}
        className="dropdown-content mt-2 w-56 shadow-2xl rounded-2xl backdrop-blur-xl bg-amber-700"
      >
        {THEMES.map((themeOption) => (
          <button
            key={themeOption.name}
            onClick={() => handleSelect(themeOption.name)}
            className={`w-full px-4 py-2 rounded-xl flex items-center gap-3 transition-colors ${
              theme === themeOption.name
                ? "bg-primary/10 text-primary"
                : "hover:bg-base-content/10"
            }`}
          >
            <PaletteIcon className="size-4" />
            <span className="text-sm font-medium">{themeOption.label}</span>

            {/* THEME PREVIEW COLORS */}
            <div className="ml-auto flex gap-1">
              {themeOption.colors.map((color, i) => (
                <span
                  key={i}
                  className="size-2 rounded-full"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
