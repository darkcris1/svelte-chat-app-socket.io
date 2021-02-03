const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const { uuid } = require('./utils')

const uid = uuid('SERVER-MESSAGE')
const users = []

function removeUser(id) {
  const user = users.find((user) => user.id === id)

  if (user !== -1) {
    return users.splice(user, 1)[0]
  }
}
io.on('connection', (socket) => {
  socket.on('send-message', ({ room, ...rest }) => {
    socket.broadcast.to(room).emit('server-message', rest)
  })
  socket.on('join-room', ({ room, username }, callback) => {
    socket.join(room)
    users.push({
      id: socket.id,
      username,
      room,
    })
    socket.broadcast.to(room).emit('server-message', {
      username,
      id: uid.create(),
      text: `${username} Join the chat`,
    })
    callback(null)
    const remainingUsers = users.filter((val) => {
      return val.room === room
    })
    socket.broadcast.to(room).emit('users', remainingUsers)
  })
  socket.on('disconnect', () => {
    const user = removeUser(socket.id)
    if (user) {
      socket.broadcast.to(user.room).emit('server-message', {
        id: uid.create(),
        text: `${user.username} left the chat`,
        username: user.username,
      })
      const remainingUsers = users.filter((val) => {
        return val.room === user.room
      })
      socket.broadcast.to(user.room).emit('users', remainingUsers)
    }
  })
})
app.get('/', (req, res) => {
  res.send('Hello world')
})

http.listen(3000, () => {
  console.log('listening on port 3000')
})
