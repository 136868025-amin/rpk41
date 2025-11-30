<template>
  <div class="fixed top-4 right-4 z-[9999] flex flex-col gap-3 pointer-events-none w-full max-w-[90vw] sm:max-w-sm">
    <TransitionGroup enter-active-class="transform ease-out duration-300 transition"
      enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
      enter-to-class="translate-y-0 opacity-100 sm:translate-x-0" leave-active-class="transition ease-in duration-100"
      leave-from-class="opacity-100" leave-to-class="opacity-0">
      <div v-for="alert in alerts" :key="alert.id"
        class="pointer-events-auto w-full overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 relative">
        <div class="p-4">
          <div class="flex items-start">
            <div class="flex-shrink-0">
              <div v-if="alert.type === 'success'"
                class="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div v-else-if="alert.type === 'error'"
                class="h-6 w-6 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <div v-else-if="alert.type === 'warning'"
                class="h-6 w-6 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600">
                <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div v-else-if="alert.type === 'info'"
                class="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div v-else-if="alert.type === 'loading'"
                class="h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                <svg class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                  </path>
                </svg>
              </div>
            </div>
            <div class="ml-3 w-0 flex-1 pt-0.5">
              <p class="text-sm font-bold text-slate-800 font-sans capitalize">
                {{ alert.type }}
              </p>
              <p class="mt-1 text-sm text-slate-600 font-sans leading-relaxed">
                {{ alert.message }}
              </p>
            </div>
            <div class="ml-4 flex flex-shrink-0">
              <button type="button"
                class="inline-flex rounded-md bg-white text-slate-400 hover:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                @click="removeAlert(alert.id)">
                <span class="sr-only">Close</span>
                <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div v-if="alert.timeout && alert.timeout > 0" class="absolute bottom-0 left-0 h-1 bg-indigo-500/20 w-full">
          <div class="h-full bg-indigo-500" :style="{ animation: `progress ${alert.timeout}ms linear forwards` }"></div>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
const { alerts, removeAlert } = useAlert()
</script>

<style scoped>
@keyframes progress {
  from {
    width: 100%;
  }

  to {
    width: 0%;
  }
}
</style>
