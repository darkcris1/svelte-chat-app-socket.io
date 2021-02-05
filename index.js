const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const path = require('path')
const { formatMsgObj } = require('./utils')
const { createUser, getUsersInRoom, removeUser } = require('./users')

app.use(express.static(path.join(__dirname, 'client/public')))
const SERVER_NAME = '_BOT_'
io.on('connection', (socket) => {
  socket.on('send-message', ({ room, ...rest }, callback) => {
    // send the message to everyone in the room
    const formattedUser = formatMsgObj(rest)
    socket.broadcast.to(room).emit('server-message', formattedUser)
    callback && callback(formattedUser)
  })
  function sendServerMessage(room, message) {
    socket.broadcast.to(room).emit(
      'server-message',
      formatMsgObj({
        username: SERVER_NAME,
        message,
      }),
    )
  }
  socket.on('join-room', (newUser, callback) => {
    // Add the user to memory
    const joinedUser = createUser(socket.id, newUser)

    const { room, username } = joinedUser
    // Notify the client who joined the chat
    socket.join(room)
    sendServerMessage(room, `${username} joined the chat`)

    socket.broadcast.to(room).emit('user-join', joinedUser) // Emit an event to pass the user object who join the chat
    const roomUsers = getUsersInRoom(room)
    callback(roomUsers, joinedUser)
  })

  function handleLeaveAndDisconnect() {
    const user = removeUser(socket.id)
    if (!user) return
    const { room, username } = user
    sendServerMessage(room, `${username} left the chat`)
    socket.broadcast.to(room).emit('user-disconnect', user)
  }

  socket.on('disconnect', handleLeaveAndDisconnect)
  socket.on('user-leave', handleLeaveAndDisconnect)
})
app.get('*', (req, res) => {
  res.send('<h1> 404 </h1>')
})
const PORT = process.env.PORT || 3000

http.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})
