<script setup>
  const model = defineModel();
</script>

<template>
  <div class="flex items-center justify-between bg-base-200 text-base-content">
    <div></div>
    <!-- Layout Controls -->
    <div class="flex items-center *:transition-colors *:duration-300">
      <button
        class="p-2"
        :class="model === 'vertical' && 'bg-primary text-primary-content'"
        @click="model = 'vertical'"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 24 24"
        >
          <g fill="none" fill-rule="evenodd">
            <path
              d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"
            />
            <path
              fill="currentColor"
              d="M5 3a2 2 0 0 0-2 2v3h18V5a2 2 0 0 0-2-2zm16 7H3v9a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2zM7 14a1 1 0 0 1 1-1h8a1 1 0 1 1 0 2H8a1 1 0 0 1-1-1m1 2a1 1 0 1 0 0 2h8a1 1 0 1 0 0-2z"
            />
          </g>
        </svg>
      </button>

      <button
        class="p-2"
        :class="model === 'horizontal' && 'bg-primary/80 text-primary-content'"
        @click="model = 'horizontal'"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 24 24"
        >
          <g fill="none">
            <path
              d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"
            />
            <path
              fill="currentColor"
              d="M19 3a2 2 0 0 1 1.995 1.85L21 5v14a2 2 0 0 1-1.85 1.995L19 21h-6V3zm-8 13v5H5a2 2 0 0 1-1.995-1.85L3 19v-3zm0-6v4H3v-4zm0-7v5H3V5a2 2 0 0 1 1.85-1.995L5 3z"
            />
          </g>
        </svg>
      </button>

      <!-- Editor Button -->
      <button
        class="p-2"
        :class="model === 'editor' && 'bg-primary/80 text-primary-content'"
        @click="model = 'editor'"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 256 256"
        >
          <g
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="16"
          >
            <path d="m 16,64 224.93778,0.09256" />
            <path
              d="M 48,16 H 207.91114 C 225.62929,16 240,30.281849 240,48 v 160 c 0,17.71816 -14.28185,32 -32,32 H 48 C 30.281848,240 16.069099,225.73073 16.06221,208.01257 L 16,48 C 15.993112,30.281851 30.281848,16 48,16 Z"
            />
            <path d="M 191.96444,64.092555 192,16" />
            <path d="M 48.044437,112.06589 H 80.02666" />
            <path d="M 48.044437,144.04812 H 175.97333" />
            <path d="M 48.044437,176.03034 H 127.99999" />
            <path d="M 48.044437,208.01256 H 80.02666" />
          </g>
        </svg>
      </button>

      <!-- Preview Button -->

      <button
        class="p-2"
        :class="model === 'preview' && 'bg-primary/80 text-primary-content'"
        @click="model = 'preview'"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 16 16"
        >
          <path
            fill="currentColor"
            fill-rule="evenodd"
            d="M3 2.5h10a.5.5 0 0 1 .5.5v10a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5V3a.5.5 0 0 1 .5-.5M1 3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2zm9.534 4.172a1 1 0 0 1 0 1.656L7.56 10.841A1 1 0 0 1 6 10.012V5.988a1 1 0 0 1 1.56-.829z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>
  </div>
</template>
