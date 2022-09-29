import { io } from 'socket.io-client'

let socket = null

export function connectSocket() {
  socket = io('http://localhost:8081')
}

export default () => socket