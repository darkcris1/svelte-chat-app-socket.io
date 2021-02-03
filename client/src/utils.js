export function uuid(prefix = '', date = true) {
  let counter = 0
  return {
    create: () => {
      return `${date ? Date.now().toString(16) : ''}${prefix}${counter++}`
    },
  }
}
