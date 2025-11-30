export const useExport = () => {
  const exportToCSV = (data: any[], filename: string) => {
    if (!data || data.length === 0) {
      alert('No data to export')
      return
    }

    // Get headers from first object
    const headers = Object.keys(data[0])
    
    // Create CSV content
    const csvContent = [
      // Headers row
      headers.join(','),
      // Data rows
      ...data.map(row => 
        headers.map(header => {
          let value = row[header]
          
          // Handle nested objects/arrays
          if (typeof value === 'object' && value !== null) {
            value = JSON.stringify(value)
          }
          
          // Escape commas and quotes
          if (typeof value === 'string') {
            value = value.replace(/"/g, '""') // Escape quotes
            if (value.includes(',') || value.includes('"') || value.includes('\n')) {
              value = `"${value}"` // Wrap in quotes if contains comma/quote/newline
            }
          }
          
          return value
        }).join(',')
      )
    ].join('\n')

    // Create blob and download
    const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' }) // Add BOM for Excel
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    
    link.href = url
    link.download = `${filename}_${new Date().toISOString().split('T')[0]}.csv`
    link.click()
    
    // Cleanup
    URL.revokeObjectURL(url)
  }

  const exportToJSON = (data: any[], filename: string) => {
    if (!data || data.length === 0) {
      alert('No data to export')
      return
    }

    const jsonContent = JSON.stringify(data, null, 2)
    const blob = new Blob([jsonContent], { type: 'application/json' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    
    link.href = url
    link.download = `${filename}_${new Date().toISOString().split('T')[0]}.json`
    link.click()
    
    URL.revokeObjectURL(url)
  }

  return {
    exportToCSV,
    exportToJSON
  }
}
