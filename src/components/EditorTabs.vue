<script setup>
  import { useDevice } from "@/composables/useDevice";
  const { isMobile } = useDevice();

  const model = defineModel();
  const emit = defineEmits(["format"]);
</script>

<template>
  <div class="bg-base-200 flex justify-between items-center">
    <div class="*:p-2 *:transition-all *:duration-300">
      <button
        class="tab text-sm gap-1"
        :class="
          model === 'html' &&
          'tab-active bg-primary/20 border-b border-base-content text-base-content'
        "
        @click="model = 'html'"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 128 128"
        >
          <path
            fill="#e44d26"
            d="M19.037 113.876L9.032 1.661h109.936l-10.016 112.198l-45.019 12.48z"
          />
          <path fill="#f16529" d="m64 116.8l36.378-10.086l8.559-95.878H64z" />
          <path
            fill="#ebebeb"
            d="M64 52.455H45.788L44.53 38.361H64V24.599H29.489l.33 3.692l3.382 37.927H64zm0 35.743l-.061.017l-15.327-4.14l-.979-10.975H33.816l1.928 21.609l28.193 7.826l.063-.017z"
          />
          <path
            fill="#fff"
            d="M63.952 52.455v13.763h16.947l-1.597 17.849l-15.35 4.143v14.319l28.215-7.82l.207-2.325l3.234-36.233l.335-3.696h-3.708zm0-27.856v13.762h33.244l.276-3.092l.628-6.978l.329-3.692z"
          />
        </svg>
        HTML
      </button>

      <button
        class="tab text-sm gap-1"
        :class="
          model === 'css' &&
          'tab-active bg-primary/20 border-b border-base-content text-base-content'
        "
        @click="model = 'css'"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 128 128"
        >
          <path
            fill="#1572b6"
            d="M18.814 114.123L8.76 1.352h110.48l-10.064 112.754l-45.243 12.543z"
          />
          <path
            fill="#33a9dc"
            d="m64.001 117.062l36.559-10.136l8.601-96.354h-45.16z"
          />
          <path
            fill="#fff"
            d="M64.001 51.429h18.302l1.264-14.163H64.001V23.435h34.682l-.332 3.711l-3.4 38.114h-30.95z"
          />
          <path
            fill="#ebebeb"
            d="m64.083 87.349l-.061.018l-15.403-4.159l-.985-11.031H33.752l1.937 21.717l28.331 7.863l.063-.018z"
          />
          <path
            fill="#fff"
            d="m81.127 64.675l-1.666 18.522l-15.426 4.164v14.39l28.354-7.858l.208-2.337l2.406-26.881z"
          />
          <path
            fill="#ebebeb"
            d="M64.048 23.435v13.831H30.64l-.277-3.108l-.63-7.012l-.331-3.711zm-.047 27.996v13.831H48.792l-.277-3.108l-.631-7.012l-.33-3.711z"
          />
        </svg>
        CSS
      </button>

      <button
        class="tab text-sm gap-1"
        :class="
          model === 'js' &&
          'tab-active bg-primary/20 border-b border-base-content text-base-content'
        "
        @click="model = 'js'"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 32 32"
        >
          <path fill="#f5de19" d="M2 2h28v28H2z" />
          <path
            d="M20.809 23.875a2.87 2.87 0 0 0 2.6 1.6c1.09 0 1.787-.545 1.787-1.3c0-.9-.716-1.222-1.916-1.747l-.658-.282c-1.9-.809-3.16-1.822-3.16-3.964c0-1.973 1.5-3.476 3.853-3.476a3.89 3.89 0 0 1 3.742 2.107L25 18.128A1.79 1.79 0 0 0 23.311 17a1.145 1.145 0 0 0-1.259 1.128c0 .789.489 1.109 1.618 1.6l.658.282c2.236.959 3.5 1.936 3.5 4.133c0 2.369-1.861 3.667-4.36 3.667a5.06 5.06 0 0 1-4.795-2.691Zm-9.295.228c.413.733.789 1.353 1.693 1.353c.864 0 1.41-.338 1.41-1.653v-8.947h2.631v8.982c0 2.724-1.6 3.964-3.929 3.964a4.085 4.085 0 0 1-3.947-2.4Z"
          />
        </svg>
        JS
      </button>

      <button
        v-if="isMobile"
        class="tab text-sm gap-1"
        :class="
          model === 'preview' &&
          'tab-active bg-primary/20 border-b border-base-content text-base-content'
        "
        @click="model = 'preview'"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 48 48"
        >
          <defs>
            <mask id="SVGXHvbndxd">
              <g fill="none">
                <path
                  stroke="#fff"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="4"
                  d="M42 18v22a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V18"
                />
                <path
                  fill="#555555"
                  stroke="#fff"
                  stroke-linejoin="round"
                  stroke-width="4"
                  d="M6 8a2 2 0 0 1 2-2h32a2 2 0 0 1 2 2v10H6z"
                />
                <path
                  fill="#fff"
                  fill-rule="evenodd"
                  d="M12 14a2 2 0 1 0 0-4a2 2 0 0 0 0 4m6 0a2 2 0 1 0 0-4a2 2 0 0 0 0 4m6 0a2 2 0 1 0 0-4a2 2 0 0 0 0 4"
                  clip-rule="evenodd"
                />
              </g>
            </mask>
          </defs>
          <path
            fill="currentColor"
            d="M0 0h48v48H0z"
            mask="url(#SVGXHvbndxd)"
          />
        </svg>
        PAGE
      </button>
    </div>
    <!-- Right buttons -->
    <div class="flex items-center gap-1">
      <!-- Format -->
      <button
        v-if="model !== 'preview'"
        @click="emit('format')"
        class="px-2 opacity-60 active:scale-110 active:opacity-100 transition-all duration-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 12h3m1-4h-4v8M8.56 3.69a9 9 0 0 0-2.92 1.95M3.69 8.56A9 9 0 0 0 3 12m.69 3.44a9 9 0 0 0 1.95 2.92m2.92 1.95A9 9 0 0 0 12 21m3.44-.69a9 9 0 0 0 2.92-1.95m1.95-2.92A9 9 0 0 0 21 12m-.69-3.44a9 9 0 0 0-1.95-2.92m-2.92-1.95A9 9 0 0 0 12 3"
          />
        </svg>
      </button>
    </div>
  </div>
</template>
