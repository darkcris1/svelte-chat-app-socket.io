const { format } = require('date-fns')

function uuid(prefix = '', date = true) {
  let counter = 0
  return {
    create: () => {
      return `${date ? Date.now().toString(16) : ''}${prefix}${counter++}`
    },
  }
}

const uid = uuid('SERVERMSG')
exports.formatMsgObj = function (obj) {
  obj.time = format(Date.now(), 'h:mm a')
  obj.id = uid.create()
  return obj
}
