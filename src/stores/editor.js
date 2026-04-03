import { ref } from "vue";
import { defineStore } from "pinia";

export const useEditorStore = defineStore("editor", () => {
  const ctrlActive = ref(false);
  const shiftActive = ref(false);

  return {
    ctrlActive,
    shiftActive
  };
});
