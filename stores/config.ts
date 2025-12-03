import { defineStore } from 'pinia'

export const useConfigStore = defineStore('config', () => {
  const config = ref<any>(null)
  const loading = ref(false)

  const fetchConfig = async () => {
    loading.value = true
    try {
      const res: any = await $fetch('/api/config')
      if (res && res.data) {
        config.value = res.data
      }
    } catch (error) {
      console.error('Failed to fetch config', error)
    } finally {
      loading.value = false
    }
  }

  return {
    config,
    loading,
    fetchConfig
  }
})
