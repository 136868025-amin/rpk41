import { defineStore } from 'pinia'

export const useBreadcrumbStore = defineStore('breadcrumb', () => {
  // State
  const currentTitle = ref('')
  const currentPath = ref('')

  // Actions
  function setTitle(title: string, path?: string) {
    currentTitle.value = title
    if (path) {
      currentPath.value = path
    }
  }

  function clearTitle() {
    currentTitle.value = ''
    currentPath.value = ''
  }

  // Getters
  const getTitle = computed(() => currentTitle.value)

  return {
    currentTitle,
    currentPath,
    setTitle,
    clearTitle,
    getTitle
  }
})
