if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
const { port, connString } = require('./config')
const authRouter = require('./routes/authRoute')
const userRouter = require('./routes/userRoute')
const chatRouter = require('./routes/chatRoute')
const messageRouter = require('./routes/messageRoute')

mongoose.connect(connString)
require('./models')
require('./passport')

const app = express()
app.use(cors())
app.use(express.json())
app.use(morgan('combined'))
app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/chat', chatRouter)
app.use('/api/message', messageRouter)

const server = app.listen(port, () => {
  console.log(`Server started on port ${port}`)
})
require('./socketio')(server)