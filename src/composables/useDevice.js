import { ref, onMounted, onUnmounted, computed } from "vue";

export function useDevice() {
  const isMobile = ref(false);

  const checkDevice = () => {
    isMobile.value = window.innerWidth <= 768;
  };

  onMounted(() => {
    checkDevice();
    window.addEventListener("resize", checkDevice);
  });

  onUnmounted(() => {
    window.removeEventListener("resize", checkDevice);
  });

  return {
    isMobile
    // isDesktop: computed(() => !isMobile.value)
  };
}
