import { reactive } from "vue";
import { defineStore } from "pinia";

import { defaultAceTheme } from "@/config/editorSettings";

export const useConfigStore = defineStore("config", () => {
  const editorSettings = reactive({
    fontSize: 14,
    lineHeight: 24,
    tabSize: 2,
    wrap: false,
    autocomplete: true,
    showLineNumbers: true,
    readOnly: false,
    theme: defaultAceTheme
  });

  return {
    editorSettings
  };
});
