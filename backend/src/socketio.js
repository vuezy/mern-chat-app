const { Server } = require('socket.io')

module.exports = (server) => {
  const io = new Server(server, {
    cors: {
      origin: '*'
    }
  })

  io.on('connection', (socket) => {
    socket.on('store-userId', (userId) => {
      socket.userId = userId
    })

    socket.on('join-room', (chatId) => {
      socket.join(chatId)
    })

    socket.on('send-message', (chatId, message) => {
      socket.to(chatId).emit('receive-message', chatId, message)
    })

    socket.on('create-chat', (chat, userId) => {
      for (const [ socketId, socketInstance ] of io.sockets.sockets) {
        if (userId === socketInstance.userId) {
          socketInstance.emit('created-chat', chat)
          return
        }
      }
    })

    socket.on('create-group', (chat, members) => {
      for (const [ socketId, socketInstance ] of io.sockets.sockets) {
        if (members.includes(socketInstance.userId)) {
          socketInstance.emit('created-chat', chat)
        }
      }
    })

    socket.on('delete-group', (chatId) => {
      io.sockets.in(chatId).emit('deleted-group', chatId)
    })

    socket.on('edit-group', (chat, members) => {
      for (const [ socketId, socketInstance ] of io.sockets.sockets) {
        if (members.find(member => member._id === socketInstance.userId)) {
          socketInstance.emit('edited-group', chat, members)
        }
      }
    })

    socket.on('leave-room', (chatId) => {
      socket.leave(chatId)
    })
  })
}