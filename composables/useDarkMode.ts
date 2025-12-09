/**
 * Dark Mode Composable
 * Provides reactive dark mode state with localStorage persistence
 * and DOM class toggling for Tailwind CSS dark mode
 */
export const useDarkMode = () => {
  const isDark = useState<boolean>('darkMode', () => false)

  // Update DOM and localStorage
  const updateDarkMode = (value: boolean) => {
    isDark.value = value
    if (import.meta.client) {
      // Update DOM
      if (value) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
      // Save to localStorage
      localStorage.setItem('darkMode', JSON.stringify(value))
    }
  }

  // Toggle dark mode
  const toggleDarkMode = () => {
    updateDarkMode(!isDark.value)
  }

  // Initialize on client
  const initDarkMode = () => {
    if (import.meta.client) {
      const stored = localStorage.getItem('darkMode')
      if (stored !== null) {
        updateDarkMode(JSON.parse(stored))
      } else {
        // Check system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        updateDarkMode(prefersDark)
      }
    }
  }

  // Auto-init on mount
  onMounted(() => {
    initDarkMode()
  })

  return {
    isDark: readonly(isDark),
    toggleDarkMode,
    initDarkMode
  }
}
