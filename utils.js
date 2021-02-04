function uuid(prefix = '', date = true) {
  let counter = 0
  return {
    create: () => {
      return `${date ? Date.now().toString(16) : ''}${prefix}${counter++}`
    },
  }
}

const uid = uuid('SERVERMSG')

exports.sendServerMessage = function (socket, room, message) {
  socket.broadcast.to(room).emit('server-message', {
    username: '☺',
    id: uid.create(),
    text: message,
  })
}
