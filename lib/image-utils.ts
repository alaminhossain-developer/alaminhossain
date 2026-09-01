/**
 * Compress and resize an image file to base64.
 * Keeps file size under ~200KB to stay within localStorage limits.
 */
export function compressImage(
  file: File,
  maxWidth = 1200,
  quality = 0.7
): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const img = new Image()
      img.onload = () => {
        const canvas = document.createElement('canvas')
        let { width, height } = img

        // Resize if wider than maxWidth
        if (width > maxWidth) {
          height = (height * maxWidth) / width
          width = maxWidth
        }

        canvas.width = width
        canvas.height = height

        const ctx = canvas.getContext('2d')
        if (!ctx) {
          reject(new Error('Failed to get canvas context'))
          return
        }

        ctx.drawImage(img, 0, 0, width, height)

        // Convert to JPEG base64
        const dataUrl = canvas.toDataURL('image/jpeg', quality)
        resolve(dataUrl)
      }
      img.onerror = () => reject(new Error('Failed to load image'))
      img.src = e.target?.result as string
    }
    reader.onerror = () => reject(new Error('Failed to read file'))
    reader.readAsDataURL(file)
  })
}

/**
 * Get human-readable file size from base64 string.
 */
export function getBase64Size(base64: string): string {
  const bytes = Math.round((base64.length * 3) / 4)
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

/**
 * Check if adding this base64 string would exceed localStorage quota.
 */
export function wouldExceedQuota(additionalBase64: string[]): boolean {
  try {
    let total = 0
    for (const key of Object.keys(localStorage)) {
      total += localStorage.getItem(key)?.length || 0
    }
    for (const b64 of additionalBase64) {
      total += b64.length
    }
    // localStorage limit is ~5MB (5 * 1024 * 1024 characters)
    return total > 4.5 * 1024 * 1024
  } catch {
    return true
  }
}
