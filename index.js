const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const path = require('path')
const { sendServerMessage } = require('./utils')
const { createUser, getUsersInRoom, removeUser } = require('./users')

app.use(express.static(path.join(__dirname, 'client/public')))

io.on('connection', (socket) => {
  socket.on('send-message', ({ room, ...rest }) => {
    // send the message to everyone in the room
    socket.broadcast.to(room).emit('server-message', rest)
  })

  socket.on('join-room', (newUser, callback) => {
    // Add the user to memory
    const joinedUser = createUser(socket.id, newUser)

    const { room, username } = joinedUser
    // Join the user
    socket.join(room)

    // Notify the client
    sendServerMessage(socket, room, `${username} joined the chat`)

    socket.broadcast.to(room).emit('user-join', joinedUser) // Emit an event to pass the user who join the chat
    const roomUsers = getUsersInRoom(room)
    callback(roomUsers, joinedUser)
  })

  function handleLeaveAndDisconnect() {
    const user = removeUser(socket.id)
    if (!user) return
    const { room, username } = user
    sendServerMessage(socket, room, `${username} left the chat`)
    socket.broadcast.to(room).emit('user-disconnect', user)
  }

  socket.on('disconnect', handleLeaveAndDisconnect)
  socket.on('user-leave', handleLeaveAndDisconnect)
})

http.listen(3000, () => {
  console.log('listening on port 3000')
})
