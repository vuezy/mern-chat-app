const Promise = require('bluebird')
const fs = require('fs')
const path = require('path')
const jwt = require('jsonwebtoken')
const { User } = require('./models')

const PRIV_KEY = fs.readFileSync(path.join(__dirname, '/../keypair/rsa_priv_key.pem'), 'utf8')

module.exports = {
  jwtSignUser(user) {
    const jwtPayload = {
      sub: user._id,
      iat: Date.now()
    }

    const token = jwt.sign(jwtPayload, PRIV_KEY, {
      algorithm: 'RS256',
      expiresIn: '7d'
    })
    return token
  },
  async validateUserId(users, currentUserId) {
    const validUsers = []
    await Promise.all(users.map(async user => {
      if (user !== currentUserId) {
        const userId = await User.findById(user, { _id: 1 }).lean()
        if (userId) {
          validUsers.push(userId._id)
        }
      }
      return null
    }))
    return validUsers
  },
  async organizeChatObject(chat, userId) {
    if (chat.isGroup) {
      chat.pic = 'https://firebasestorage.googleapis.com/v0/b/mern-chat-app-d7304.appspot.com/o/images%2Fgroup.jpg?alt=media&token=0f208170-b84d-4673-992d-83f90ad90d06'
    }
    else {
      let sender = chat.users.find(user => user._id.toString() !== userId)
      chat.name = sender.name
      sender = await User.findById(sender._id, { email: 1, pic: 1 }).lean()
      chat.email = sender.email
      chat.pic = sender.pic
    }
  }
}