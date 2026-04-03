<script setup>
  import { ref } from "vue";
  import BaseEditor from "./BaseEditor.vue";

  const model = defineModel();
  const editorRef = ref(null);

  function runCommand(command) {
    editorRef.value?.runCommand(command);
  }

  defineExpose({
    runCommand
  });
</script>

<template>
  <BaseEditor ref="editorRef" v-model="model" lang="html" />
</template>
