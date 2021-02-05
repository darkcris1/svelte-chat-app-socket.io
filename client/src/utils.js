import calert from 'calerts'
import Compressor from 'compressorjs'

export function uuid(prefix = '', date = true) {
  let counter = 0
  return {
    create: () => {
      return `${date ? Date.now().toString(16) : ''}${prefix}${counter++}`
    },
  }
}

export function toDataUrl(file) {
  return new Promise((resolve) => {
    const reader = new FileReader()

    function handleError() {
      calert('Error', 'Cannot send the image', 'error')
    }
    reader.onload = function () {
      resolve(reader.result)
    }
    reader.onerror = handleError
    new Compressor(file, {
      width: 600,
      quality: 0.6,
      success(result) {
        reader.readAsDataURL(result)
      },
      error: handleError,
    })
  })
}
