const users = []

exports.removeUser = function (id) {
  const user = users.findIndex((user) => user.id === id)

  if (user !== -1) {
    return users.splice(user, 1)[0]
  }
}
exports.createUser = function (id, data) {
  data.id = id
  users.push(data)
  return data
}
exports.getUsersInRoom = function (room) {
  return users.filter((val) => val.room === room)
}

exports.getUsers = () => users
