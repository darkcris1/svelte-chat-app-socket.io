export const ID_KEY = 'chat-app.id'

export const SOCKET_ENDPOINT = !process.env.isProd
  ? 'http://localhost:3000/'
  : '/'
