export interface Alert {
  id: number
  message: string
  type: 'success' | 'error' | 'warning' | 'info' | 'loading'
  timeout?: number
}

export const useAlert = () => {
  const alerts = useState<Alert[]>('alerts', () => [])

  const showAlert = (message: string, type: Alert['type'] = 'info', timeout = 5000) => {
    const id = Date.now() + Math.random()
    alerts.value.push({ id, message, type, timeout })

    if (timeout > 0 && type !== 'loading') {
      setTimeout(() => {
        removeAlert(id)
      }, timeout)
    }
    return id
  }

  const showLoading = (message: string = 'Processing...') => {
    return showAlert(message, 'loading', 0)
  }

  const removeAlert = (id: number) => {
    alerts.value = alerts.value.filter((alert) => alert.id !== id)
  }

  return {
    alerts,
    showAlert,
    showLoading,
    removeAlert,
    closeAlert: removeAlert
  }
}
