<script setup>
  import { computed } from "vue";

  const props = defineProps({
    html: String,
    css: String,
    js: String
  });

  const srcDoc = computed(
    () => `
<!DOCTYPE html>
<html>
  <head>
    <style>${props.css}</style>
  </head>
  <body>
    ${props.html}
    <script>
      ${props.js}
    <\/script>
  </body>
</html>
`
  );
</script>

<template>
  <div class="fscreen">
    <iframe
      :srcdoc="srcDoc"
      sandbox="allow-scripts"
      class="fscreen"
    />
  </div>
</template>
