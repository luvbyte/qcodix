// Default Theme
const DEFAULT_THEME = "dark";

// Version
export const VERSION = "0.0.1";

// Get theme from localStorage or Default Theme
export function getTheme() {
  return localStorage.getItem("qcodix-theme") || DEFAULT_THEME;
}

// Apply theme to #qcodix-main element
export const applyTheme = theme => {
  localStorage.setItem("qcodix-theme", theme);
  document.getElementById("qcodix-main")?.setAttribute("data-theme", theme);
};
