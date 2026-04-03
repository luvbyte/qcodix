<script setup>
  import { ref } from "vue";
  import EditorContainer from "@/components/EditorContainer.vue";
  import Navbar from "@/components/Navbar.vue";
  import Settings from "@/components/Settings.vue";
  import Sidebar from "@/components/Sidebar.vue";

  const showSettings = ref(false);
  const showSideBar = ref(false);
</script>

<template>
  <div
    id="qcodix-main"
    class="h-dvh flex flex-col overflow-hidden font-body transition-colors"
  >
    <Transition name="fade-scale">
      <Settings v-if="showSettings" @close="showSettings = false" />
    </Transition>
    <Navbar
      @showSettings="() => (showSettings = true)"
      @showSideBar="showSideBar = true"
    />
    <EditorContainer />

    <!-- Sidebar -->
    <div
      class="fixed inset-0 z-[999] full overflow-hidden"
      @click.self="showSideBar = false"
      :class="{ 'pointer-events-none -z-20': !showSideBar }"
    >
      <!-- SIDEBAR -->
      <Transition name="slide-right">
        <div
          v-show="showSideBar"
          class="relative h-full w-3/4 sm:w-1/2 bg-base-100 text-base-content"
        >
          <Sidebar />
        </div>
      </Transition>
    </div>
  </div>
</template>

<style scoped></style>
