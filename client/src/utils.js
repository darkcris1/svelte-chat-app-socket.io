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

    reader.onload = function () {
      resolve(reader.result)
    }
    reader.readAsDataURL(file)
  })
}
