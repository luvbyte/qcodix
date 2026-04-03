<template>
  <div class="fixed inset-0 z-[160] bg-base-100 flex flex-col overflow-hidden">
    <!-- Header -->
    <div class="bg-base-300 shadow-xl flex items-center justify-between p-2">
      <h1 class="text-lg font-semibold">Settings</h1>
      <button class="py-2" @click="emit('close')">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M18.3 5.71a.996.996 0 0 0-1.41 0L12 10.59L7.11 5.7A.996.996 0 1 0 5.7 7.11L10.59 12L5.7 16.89a.996.996 0 1 0 1.41 1.41L12 13.41l4.89 4.89a.996.996 0 1 0 1.41-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4"
          />
        </svg>
      </button>
    </div>

    <!-- Content -->
    <div
      class="flex-1 overflow-auto px-4 py-4 max-w-xl w-full mx-auto space-y-6"
    >
      <div class="divider">EDITOR</div>

      <!-- Font Size -->
      <div class="flex items-center justify-between gap-4">
        <span class="text-sm">Font Size</span>
        <input
          type="number"
          class="input input-sm input-bordered w-24 focus:outline-none"
          v-model.number="localSettings.fontSize"
          min="10"
          max="40"
        />
      </div>

      <!-- Line Height -->
      <div class="flex items-center justify-between gap-4">
        <span class="text-sm">Line Height</span>
        <input
          type="number"
          class="input input-sm input-bordered w-24 focus:outline-none"
          v-model.number="localSettings.lineHeight"
        />
      </div>

      <!-- Tab Size -->
      <div class="flex items-center justify-between gap-4">
        <span class="text-sm">Tab Size</span>
        <input
          type="number"
          class="input input-sm input-bordered w-24 focus:outline-none"
          v-model.number="localSettings.tabSize"
          min="1"
          max="8"
        />
      </div>

      <div class="divider"></div>

      <!-- Wrap -->
      <div class="flex items-center justify-between">
        <span class="text-sm">Word Wrap</span>
        <input
          type="checkbox"
          class="toggle toggle-sm"
          v-model="localSettings.wrap"
        />
      </div>

      <!-- Line Numbers -->
      <div class="flex items-center justify-between">
        <span class="text-sm">Line Numbers</span>
        <input
          type="checkbox"
          class="toggle toggle-sm"
          v-model="localSettings.showLineNumbers"
        />
      </div>

      <!-- Auto Complete -->
      <div class="flex items-center justify-between">
        <span class="text-sm">Autocomplete</span>
        <input
          type="checkbox"
          class="toggle toggle-sm toggle-info"
          v-model="localSettings.autocomplete"
        />
      </div>

      <!-- Read Only -->
      <div class="flex items-center justify-between">
        <span class="text-sm">Read Only</span>
        <input
          type="checkbox"
          class="toggle toggle-sm toggle-error"
          v-model="localSettings.readOnly"
        />
      </div>

      <!-- Divider -->
      <div class="divider my-6">THEMES</div>

      <div class="flex flex-col gap-2 overflow-y-auto">
        <div
          v-for="theme in aceThemes"
          :key="theme"
          class="p-2 rounded flex items-center border border-base-content/20"
          :class="{
            'bg-primary text-primary-content': localSettings.theme === theme
          }"
          @click="setTheme(theme)"
        >
          <h1>{{ theme }}</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { reactive, watch } from "vue";
  import { useConfigStore } from "@/stores/config";

  import { aceThemes } from "@/config/editorSettings";

  const emit = defineEmits(["close"]);

  const config = useConfigStore();

  // Local copy
  const localSettings = reactive({ ...config.editorSettings });

  // Simple debounce function
  let timeout = null;
  const debounceUpdate = newVal => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      Object.assign(config.editorSettings, newVal);
    }, 300); // adjust delay here
  };

  const setTheme = theme => {
    localSettings.theme = theme;
  };

  // Watch local changes
  watch(
    localSettings,
    val => {
      debounceUpdate(val);
    },
    { deep: true }
  );
</script>
