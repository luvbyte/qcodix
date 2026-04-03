<script setup>
  import { ref, onMounted, watch } from "vue";
  import { VAceEditor } from "vue3-ace-editor";

  import { applyEditorSettings } from "@/config/editorSettings";
  import { useConfigStore } from "@/stores/config";

  import { useEditorStore } from "@/stores/editor";

  import { debounce } from "@/core/utils";

  import * as prettier from "prettier/standalone";
  import * as parserEstree from "prettier/plugins/estree";
  import * as parserBabel from "prettier/parser-babel";
  import * as parserHtml from "prettier/parser-html";
  import * as parserPostcss from "prettier/parser-postcss";

  const config = useConfigStore();
  const editorConfig = useEditorStore();

  const props = defineProps({
    modelValue: String,
    lang: String
  });

  const emit = defineEmits(["update:modelValue"]);

  const editorRef = ref(null);

  function getParser(lang) {
    switch (lang) {
      case "javascript":
      case "js":
        return "babel";
      case "html":
        return "html";
      case "css":
        return "css";
      default:
        return "babel";
    }
  }

  function getEditor() {
    return editorRef.value?.getAceInstance?.();
  }

  const onChange = debounce(val => {
    emit("update:modelValue", val);
  }, 300);

  async function formatCode() {
    const editor = getEditor();
    if (!editor) return;

    const code = editor.getValue();

    try {
      const parser = getParser(props.lang);

      const formatted = await prettier.format(code, {
        parser,
        plugins: [parserBabel, parserEstree, parserHtml, parserPostcss]
      });

      const cursor = editor.getCursorPosition();

      // Save undo stack
      const undoManager = editor.session.getUndoManager();

      editor.setValue(formatted, 1);

      // Restore undo manager
      editor.session.setUndoManager(undoManager);

      editor.moveCursorToPosition(cursor);
    } catch (err) {
      console.warn("Format error:", err.message);
    }
  }

  function runCommand({
    command,
    payload = null,
    modifiers = null,
    resetModifiers = false
  }) {
    const editor = getEditor();
    if (!editor) return false;

    const { ctrl, shift } = modifiers || {
      ctrl: editorConfig.ctrlActive,
      shift: editorConfig.shiftActive
    };

    // combo key generator
    const comboKey = [ctrl && "ctrl", shift && "shift", command]
      .filter(Boolean)
      .join("+");

    // Key combo mappings
    const comboMappings = {
      "ctrl+a": "selectAll",
      "ctrl+/": "toggleCommentLines",
      "ctrl+z": "undo",
      "ctrl+y": "redo",
      "ctrl+d": "copyLineDown",
      "ctrl+x": "deleteLine",
      "ctrl+l": "selectLine",
      "ctrl+ ": "triggerAutocomplete",

      "ctrl+backspace": "removeWordLeft",
      //
      "ctrl+navigateLeft": "navigateWordLeft",
      "ctrl+navigateRight": "navigateWordRight",

      // SHIFT combos (selection)
      "shift+navigateLeft": "selectLeft",
      "shift+navigateRight": "selectRight",
      "shift+navigateUp": "selectUp",
      "shift+navigateDown": "selectDown",

      // CTRL + SHIFT combos
      "ctrl+shift+navigateLeft": "selectWordLeft",
      "ctrl+shift+navigateRight": "selectWordRight"
    };

    // command actions
    const actions = {
      tab: () => editor.indent(),
      outdent: () => editor.blockOutdent(),

      toggleCommentLines: () => editor.toggleCommentLines(),

      undo: () => editor.undo(),
      redo: () => editor.redo(),
      selectAll: () => editor.selectAll(),
      clear: () => editor.setValue(""),

      format: () => formatCode(),

      copy: () => {
        const selectedText = editor.getSelectedText();

        if (selectedText) {
          navigator.clipboard.writeText(selectedText);
        }
      },
      paste: async () => {
        const text = await navigator.clipboard.readText();
        editor.insert(text);
      },

      // Cursor navigation
      navigateLeft: (count = 1) => editor.navigateLeft(count),
      navigateRight: (count = 1) => editor.navigateRight(count),
      navigateUp: (count = 1) => editor.navigateUp(count),
      navigateDown: (count = 1) => editor.navigateDown(count),

      // Selection
      selectLine: () => editor.selection.selectLine(),

      selectLeft: () => editor.selection.selectLeft(),
      selectRight: () => editor.selection.selectRight(),
      selectUp: () => editor.selection.selectUp(),
      selectDown: () => editor.selection.selectDown(),

      // Word
      removeWordLeft: () => editor.removeWordLeft(),

      navigateWordLeft: () => editor.navigateWordLeft(),
      navigateWordRight: () => editor.navigateWordRight(),

      selectWordLeft: () => editor.selection.selectWordLeft(),
      selectWordRight: () => editor.selection.selectWordRight(),

      // Line

      moveLineUp: () => editor.moveLinesUp(),
      moveLineDown: () => editor.moveLinesDown(),

      copyLineUp: () => editor.copyLinesUp(),
      copyLineDown: () => editor.copyLinesDown(),

      deleteLine: () => editor.removeLines(),

      // Utils
      triggerAutocomplete: () => editor.execCommand("startAutocomplete")
    };

    command = comboMappings[comboKey] || command;

    try {
      actions[command]?.(payload);
    } catch (e) {
      console.error(e);
    } finally {
      if (!resetModifiers) return;
      // reset flags AFTER handling
      editorConfig.ctrlActive = false;
      editorConfig.shiftActive = false;
    }
  }

  defineExpose({ runCommand });

  // Watch for changes
  watch(
    () => config.editorSettings,
    newSettings => {
      applyEditorSettings(getEditor(), newSettings);
    },
    { deep: true }
  );

  onMounted(() => {
    const editor = getEditor();
    if (!editor) return;

    const addCommand = (name, win, mac, exec) => {
      editor.commands.addCommand({
        name,
        bindKey: { win, mac },
        exec
      });
    };

    // Initial Default Options
    editor.setOptions({
      enableMobileMenu: false,

      enableBasicAutocompletion: true,
      enableLiveAutocompletion: true
      // enableSnippets: true
    });

    // Core
    addCommand("undo", "Ctrl-Z", "Command-Z", editor => editor.undo());
    addCommand("redo", "Ctrl-Y", "Command-Shift-Z", editor => editor.redo());
    // Clipboard
    addCommand("copy", "Ctrl-C", "Command-C", editor =>
      editor.execCommand("copy")
    );
    addCommand("paste", "Ctrl-V", "Command-V", editor =>
      editor.execCommand("paste")
    );
    // Formatting
    addCommand("formatCode", "Ctrl-Shift-F", "Command-Shift-F", () =>
      formatCode()
    );
    // Autocomplete
    addCommand("triggerAutocomplete", "Ctrl-Space", "Ctrl-Space", editor =>
      editor.execCommand("startAutocomplete")
    );
    // Selection
    addCommand("selectAll", "Ctrl-A", "Command-A", editor =>
      editor.selectAll()
    );
    // Comments
    addCommand("toggleComment", "Ctrl-/", "Command-/", editor =>
      editor.toggleCommentLines()
    );
    // Line operations
    addCommand("deleteLine", "Ctrl-X", "Command-X", editor =>
      editor.removeLines()
    );
    addCommand("duplicateLine", "Ctrl-D", "Command-D", editor =>
      editor.copyLinesDown()
    );
    addCommand("moveLineUp", "Alt-Up", "Option-Up", editor =>
      editor.moveLinesUp()
    );
    addCommand("moveLineDown", "Alt-Down", "Option-Down", editor =>
      editor.moveLinesDown()
    );
    // Word operations
    addCommand("removeWordLeft", "Ctrl-Backspace", "Option-Backspace", editor =>
      editor.removeWordLeft()
    );

    // Applying Custum settings
    applyEditorSettings(editor, config.editorSettings);

    // Virtual Modifiers for mobile
    editor.keyBinding.addKeyboardHandler({
      handleKeyboard: function (data, hashId, keyString, keyCode, event) {
        const editor = data.editor;
        if (!editor) return;

        // Virtual case (your system)
        if (editorConfig.ctrlActive || editorConfig.shiftActive) {
          runCommand({
            command: keyString,
            modifiers: {
              ctrl: editorConfig.ctrlActive,
              shift: editorConfig.shiftActive
            },
            resetModifiers: true
          });

          return {
            command: "null",
            passEvent: false
          };
        }
      }
    });
  });
</script>

<template>
  <VAceEditor
    ref="editorRef"
    :value="modelValue"
    theme="monokai"
    @update:value="onChange"
    :lang="lang"
    class="fscreen"
  />
</template>
