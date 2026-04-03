<script setup>
  import { ref, computed, onMounted, watch } from "vue";

  import EditorTabs from "./EditorTabs.vue";
  import PreviewFrame from "./PreviewFrame.vue";
  import Toolbar from "./Toolbar.vue";

  import HtmlEditor from "@/components/editors/HtmlEditor.vue";
  import CssEditor from "@/components/editors/CssEditor.vue";
  import JsEditor from "@/components/editors/JsEditor.vue";

  import ShortcutsPanel from "@/components/ShortcutsPanel.vue";
  import SearchReplace from "@/components/SearchReplace.vue";

  import { useDevice } from "@/composables/useDevice";
  const { isMobile } = useDevice();

  import { useConfigStore } from "@/stores/config";

  const config = useConfigStore();

  const editorRef = ref(null);

  // Active tab
  const activeTab = ref("html");

  // Code state
  const html = ref("");
  const css = ref("");
  const js = ref("");

  // Refs
  const htmlRef = ref(null);
  const cssRef = ref(null);
  const jsRef = ref(null);

  const editorMap = {
    html: htmlRef,
    css: cssRef,
    js: jsRef
  };

  const activeEditorRef = computed(() => {
    return editorMap[activeTab.value]?.value || null;
  });

  // Layout state

  const layout = ref("editor");

  // Layout direction
  const layoutClass = computed(() => {
    return layout.value === "horizontal" ? "flex-row" : "flex-col";
  });

  function applyFontSize(size) {
    editorSettings.fontSize = size;

    htmlRef.value?.undo?.(); // just to ensure mounted (optional)

    htmlRef.value?.setFontSize?.(size);
    cssRef.value?.setFontSize?.(size);
    jsRef.value?.setFontSize?.(size);
  }

  function runCommand(command) {
    const editor = activeEditorRef.value;

    if (!editor) return;

    editor.runCommand(command);
  }
</script>

<template>
  <div class="flex-1 flex flex-col">
    <!-- Toolbar -->
    <Toolbar v-if="!isMobile" v-model="layout" />

    <!-- Tabs -->
    <EditorTabs
      v-if="isMobile || activeTab !== 'preview'"
      v-model="activeTab"
      @format="() => runCommand({ command: 'format' })"
    />

    <!-- Layout Container -->
    <div :class="['flex flex-1', layoutClass]">
      <!-- Editor -->
      <div
        v-show="layout !== 'preview' && activeTab !== 'preview'"
        :class="[layout === 'horizontal' ? 'w-1/2 h-full' : 'h-1/2 w-full']"
        class="flex-1 flex flex-col"
      >
        <HtmlEditor
          ref="htmlRef"
          v-show="activeTab === 'html'"
          v-model="html"
        />
        <CssEditor ref="cssRef" v-show="activeTab === 'css'" v-model="css" />
        <JsEditor ref="jsRef" v-show="activeTab === 'js'" v-model="js" />
      </div>

      <!-- Preview -->
      <div
        v-show="layout !== 'editor' || activeTab === 'preview'"
        :class="[layout === 'horizontal' ? 'w-1/2 h-full' : 'h-1/2 w-full']"
        class="flex-1"
      >
        <PreviewFrame :html="html" :css="css" :js="js" />
      </div>
    </div>

    <!--
    <SearchReplace />
    -->

    <ShortcutsPanel
      v-if="
        isMobile && activeTab !== 'preview' && !config.editorSettings.readOnly
      "
      @run="runCommand"
    />
  </div>
</template>
