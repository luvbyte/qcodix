<script setup>
  import { ref } from "vue";
  import { useEditorStore } from "@/stores/editor";

  const editorConfig = useEditorStore();

  const hideBar = ref(false);

  const emit = defineEmits(["run"]);

  function run(command, payload = null) {
    emit("run", { command, payload });
  }
</script>

<template>
  <!-- Bottom Shortcut Bar -->
  <div class="w-full p-2 bg-base-200 text-base-content">
    <!-- Toggle Button -->

    <div class="relative w-full h-4">
      <button
        @mousedown.prevent
        @click="hideBar = !hideBar"
        class="bg-primary/80 text-primary-content shadow-lg border border-primary absolute -top-6 right-2 rounded-lg p-2 px-4"
      >
        <!-- Icon Up -->
        <svg
          v-if="hideBar"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
        >
          <path
            fill="currentColor"
            d="m2.931 10.843l4.685-4.611a.546.546 0 0 1 .768 0l4.685 4.61a.55.55 0 0 0 .771 0a.53.53 0 0 0 0-.759l-4.684-4.61a1.65 1.65 0 0 0-2.312 0l-4.684 4.61a.53.53 0 0 0 0 .76a.55.55 0 0 0 .771 0"
          />
        </svg>
        <!-- Icon Up -->
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
        >
          <path
            fill="currentColor"
            fill-rule="non-zero"
            d="M13.069 5.157L8.384 9.768a.546.546 0 0 1-.768 0L2.93 5.158a.55.55 0 0 0-.771 0a.53.53 0 0 0 0 .759l4.684 4.61a1.65 1.65 0 0 0 2.312 0l4.684-4.61a.53.53 0 0 0 0-.76a.55.55 0 0 0-.771 0"
          />
        </svg>
      </button>
    </div>
    <Transition name="slide-up">
      <div v-if="!hideBar" class="flex flex-col gap-1">
        <!-- Row 1 -->
        <div
          @mousedown.prevent
          class="grid grid-flow-col auto-cols-[calc(100%/8)] overflow-x-auto scrollbar-hide snap-x"
        >
          <button
            class="short-btn"
            :class="editorConfig.ctrlActive && 'btn-primary'"
            @click="editorConfig.ctrlActive = !editorConfig.ctrlActive"
          >
            CTRL
          </button>
          <!-- Tab -->
          <button class="short-btn" @click="run('tab')">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M22 4.25a.75.75 0 0 0-1.5 0v15a.75.75 0 0 0 1.5 0zm-9.72 14.28a.75.75 0 1 1-1.06-1.06l4.97-4.97H1.75a.75.75 0 0 1 0-1.5h14.44l-4.97-4.97a.75.75 0 0 1 1.06-1.06l6.25 6.25a.75.75 0 0 1 0 1.06z"
              />
            </svg>
          </button>
          <!-- Shift -->
          <button
            class="short-btn"
            :class="editorConfig.shiftActive && 'btn-primary'"
            @click="editorConfig.shiftActive = !editorConfig.shiftActive"
          >
            SHIFT
          </button>
          <!-- Undo -->
          <button class="short-btn" @click="run('undo')">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M12.5 8c-2.65 0-5.05.99-6.9 2.6L3.71 8.71C3.08 8.08 2 8.52 2 9.41V15c0 .55.45 1 1 1h5.59c.89 0 1.34-1.08.71-1.71l-1.91-1.91c1.39-1.16 3.16-1.88 5.12-1.88c3.16 0 5.89 1.84 7.19 4.5c.27.56.91.84 1.5.64c.71-.23 1.07-1.04.75-1.72C20.23 10.42 16.65 8 12.5 8"
              />
            </svg>
          </button>
          <!-- Redo -->
          <button class="short-btn" @click="run('redo')">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M18.4 10.6C16.55 8.99 14.15 8 11.5 8c-4.16 0-7.74 2.42-9.44 5.93c-.32.67.04 1.47.75 1.71c.59.2 1.23-.08 1.5-.64c1.3-2.66 4.03-4.5 7.19-4.5c1.95 0 3.73.72 5.12 1.88l-1.91 1.91c-.63.63-.19 1.71.7 1.71H21c.55 0 1-.45 1-1V9.41c0-.89-1.08-1.34-1.71-.71z"
              />
            </svg>
          </button>
          <!-- Copy -->
          <button class="short-btn" @click="run('copy')">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M6.6 11.397c0-2.726 0-4.089.843-4.936c.844-.847 2.201-.847 4.917-.847h2.88c2.715 0 4.073 0 4.916.847c.844.847.844 2.21.844 4.936v4.82c0 2.726 0 4.089-.844 4.936c-.843.847-2.201.847-4.916.847h-2.88c-2.716 0-4.073 0-4.917-.847s-.843-2.21-.843-4.936z"
              />
              <path
                fill="currentColor"
                d="M4.172 3.172C3 4.343 3 6.229 3 10v2c0 3.771 0 5.657 1.172 6.828c.617.618 1.433.91 2.62 1.048c-.192-.84-.192-1.996-.192-3.66v-4.819c0-2.726 0-4.089.843-4.936c.844-.847 2.201-.847 4.917-.847h2.88c1.652 0 2.8 0 3.638.19c-.138-1.193-.43-2.012-1.05-2.632C16.657 2 14.771 2 11 2S5.343 2 4.172 3.172"
                opacity="0.5"
              />
            </svg>
          </button>
          <!-- Paste -->
          <button class="short-btn" @click="run('paste')">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
            >
              <path
                fill="currentColor"
                d="M3.626 3.533a.25.25 0 0 0-.126.217v9.5c0 .138.112.25.25.25h8.5a.25.25 0 0 0 .25-.25v-9.5a.25.25 0 0 0-.126-.217a.75.75 0 0 1 .752-1.298c.541.313.874.89.874 1.515v9.5A1.75 1.75 0 0 1 12.25 15h-8.5A1.75 1.75 0 0 1 2 13.25v-9.5c0-.625.333-1.202.874-1.515a.75.75 0 0 1 .752 1.298M5.75 1h4.5a.75.75 0 0 1 .75.75v3a.75.75 0 0 1-.75.75h-4.5A.75.75 0 0 1 5 4.75v-3A.75.75 0 0 1 5.75 1m.75 3h3V2.5h-3Z"
              />
            </svg>
          </button>
          <!-- Comment -->
          <button class="short-btn" @click="run('toggleCommentLines')">
            //
          </button>
        </div>

        <!-- Row 2 -->
        <div
          @mousedown.prevent
          class="grid grid-flow-col auto-cols-[calc(100%/8)] overflow-x-auto scrollbar-hide snap-x"
        >
          <!-- Arrow Left -->
          <button class="short-btn" @click="run('navigateLeft', 1)">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m14 7l-5 5l5 5"
              />
            </svg>
          </button>
          <!-- Arrow Right -->
          <button class="short-btn" @click="run('navigateRight', 1)">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m10 17l5-5l-5-5"
              />
            </svg>
          </button>
          <!-- Arrow Up -->
          <button class="short-btn" @click="run('navigateUp', 1)">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m17 14l-5-5l-5 5"
              />
            </svg>
          </button>
          <!-- Arrow Down -->
          <button class="short-btn" @click="run('navigateDown', 1)">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
            >
              &
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m7 10l5 5l5-5"
              />
            </svg>
          </button>
          <!-- Move Up -->
          <button class="short-btn" @click="run('moveLineUp')">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
            >
              <g fill="none">
                <path
                  fill="currentColor"
                  d="M11.25 20a.75.75 0 0 0 1.5 0zm1.5 0V4h-1.5v16z"
                  opacity="0.5"
                />
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="m18 10l-6-6l-6 6"
                />
              </g>
            </svg>
          </button>
          <!-- Move Down -->
          <button class="short-btn" @click="run('moveLineDown')">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
            >
              <g fill="none">
                <path
                  fill="currentColor"
                  d="M12.75 4a.75.75 0 0 0-1.5 0zm-1.5 0v16h1.5V4z"
                  opacity="0.5"
                />
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="m18 14l-6 6l-6-6"
                />
              </g>
            </svg>
          </button>
          <!-- Copy Up -->
          <button class="short-btn" @click="run('copyLineUp')">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="m12 4l-6 6m6-6l6 6m-6-6v10.5m0 5.5v-2.5"
              />
            </svg>
          </button>
          <!-- Copy Down -->
          <button class="short-btn" @click="run('copyLineDown')">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="m12 20l6-6m-6 6l-6-6m6 6V9.5M12 4v2.5"
              />
            </svg>
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>
