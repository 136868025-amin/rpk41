export const useDarkMode = () => {
  const isDark = useState<boolean>('darkMode', () => false)

  // Initialize from localStorage on client
  if (process.client) {
    const stored = localStorage.getItem('darkMode')
    if (stored) {
      isDark.value = JSON.parse(stored)
    }
  }

  // Toggle dark mode
  const toggleDarkMode = () => {
    isDark.value = !isDark.value
    if (process.client) {
      localStorage.setItem('darkMode', JSON.stringify(isDark.value))
    }
  }

  return {
    isDark: readonly(isDark),
    toggleDarkMode
  }
}
