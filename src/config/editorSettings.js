export const aceThemes = [
  "ambiance",
  "chaos",
  "chrome",
  "clouds",
  "clouds_midnight",
  "cobalt",
  "crimson_editor",
  "dawn",
  "dracula",
  "dreamweaver",
  "eclipse",
  "github",
  "gob",
  "gruvbox",
  "idle_fingers",
  "iplastic",
  "katzenmilch",
  "kr_theme",
  "kuroir",
  "merbivore",
  "merbivore_soft",
  "mono_industrial",
  "monokai",
  "nord_dark",
  "one_dark",
  "pastel_on_dark",
  "solarized_dark",
  "solarized_light",
  "sqlserver",
  "terminal",
  "textmate",
  "tomorrow",
  "tomorrow_night",
  "tomorrow_night_blue",
  "tomorrow_night_bright",
  "tomorrow_night_eighties",
  "twilight",
  "vibrant_ink",
  "xcode"
];

export const defaultAceTheme = "one_dark";

export function getTheme(theme, defaultTheme = defaultAceTheme) {
  if (!theme) return `ace/theme/${defaultTheme}`;

  // Remove prefix if already present
  const cleanTheme = theme.replace(/^ace\/theme\//, "");

  // Check if theme exists
  if (aceThemes.includes(cleanTheme)) {
    return `ace/theme/${cleanTheme}`;
  }

  // Fallback
  return `ace/theme/${defaultTheme}`;
}

export function applyEditorSettings(editor, settings) {
  if (!editor || !settings) return;

  // Bulk apply editor options
  editor.setOptions({
    fontSize: settings.fontSize,
    readOnly: settings.readOnly,
    useTextareaForIME: settings.useTextareaForIME,
    theme: getTheme(settings.theme),

    enableBasicAutocompletion: settings.autocomplete,
    enableLiveAutocompletion: settings.autocomplete
  });

  editor.container.style.lineHeight = `${settings.lineHeight}px`;

  const session = editor.getSession?.();
  if (session) {
    if (settings.tabSize != null) {
      session.setTabSize(settings.tabSize);
    }
    if (settings.wrap != null) {
      session.setUseWrapMode(settings.wrap);
    }
  }

  if (settings.showLineNumbers != null && editor.renderer) {
    editor.renderer.setShowGutter(settings.showLineNumbers);
  }

  saveSettings(settings);
}

export function saveSettings(settings) {
  localStorage.setItem("settings", JSON.stringify(settings));
}

export function loadSettings() {
  const saved = localStorage.getItem("settings");
  return saved ? JSON.parse(saved) : {};
}
