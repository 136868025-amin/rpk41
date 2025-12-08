export const useLoader = () => {
  const isLoading = useState('app-loader', () => true)
  const loadingQueue = useState<Set<string>>('app-loader-queue', () => new Set())

  const startLoading = (id: string = 'global') => {
    loadingQueue.value.add(id)
    isLoading.value = true
  }

  const finishLoading = (id: string = 'global') => {
    loadingQueue.value.delete(id)
    if (loadingQueue.value.size === 0) {
      // Reduced delay for faster perceived performance
      setTimeout(() => {
        if (loadingQueue.value.size === 0) {
          isLoading.value = false
        }
      }, 100) // Reduced from 500ms to 100ms
    }
  }

  return {
    isLoading,
    startLoading,
    finishLoading
  }
}
