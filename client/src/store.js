import io from 'socket.io-client'
import { writable } from 'svelte/store'
import { ID_KEY, SOCKET_ENDPOINT } from './const'

export const users = writable([])
export const loggedUser = writable()

export const socket = io(SOCKET_ENDPOINT, {
  transports: ['websocket', 'polling'],
})

socket.on('user-disconnect', (leavingUser) => {
  users.update((currentUsers) => {
    return currentUsers.filter((user) => user.id !== leavingUser.id)
  })
})
socket.on('user-join', (joinedUser) => {
  users.update((currentUsers) => [...currentUsers, joinedUser])
})

export function joinRoom(name, roomID) {
  const user = { username: name, room: roomID }
  socket.emit('join-room', user, (roomUsers, currentUser) => {
    const person = roomUsers.find(({ id }) => id === currentUser.id)
    person.isSelf = true
    users.set(roomUsers)
    loggedUser.set(user)
    localStorage.setItem(ID_KEY, JSON.stringify(user))
  })
}
const saveUser = JSON.parse(localStorage.getItem(ID_KEY))
if (saveUser) {
  joinRoom(saveUser.username, saveUser.room)
}
