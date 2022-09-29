const Promise = require('bluebird')
const { Chat, UnreadMessage } = require('../models')
const { validateUserId, organizeChatObject } = require('../utils')

module.exports = {
  async getAllChats(req, res) {
    try {
      const userId = req.user._id
      let chats = await Chat.find(
        {
          users: userId
        }, {
          name: 1,
          isGroup: 1,
          users: 1,
          latestMessage: 1
        })
        .sort({ updatedAt: -1 })
        .populate('users', { _id: 1, name: 1 })
        .populate('latestMessage', { content: 1 })
        .lean()
      
      chats = await Promise.all(chats.map(async (chat) => {
        await organizeChatObject(chat, userId.toString())
        const unread = await UnreadMessage.findOne({
          user: userId,
          chat: chat._id
        }, { total: 1 }).lean()
        return {
          _id: chat._id,
          name: chat.name,
          latestMessage: chat.latestMessage ? chat.latestMessage.content : null,
          pic: chat.pic,
          unread: unread.total
        }
      }))

      res.status(200).json({
        success: true,
        chats: chats
      })
    }
    catch(err) {
      res.status(500).json({
        success: false,
        error: 'An error has occured, please try again!'
      })
    }
  },
  async createChat(req, res) {
    try {
      const userId = req.user._id
      const chatData = {}
      chatData.users = await validateUserId([...new Set(req.body.users)], userId.toString())
      if (chatData.users.length === 0) {
        return res.status(400).json({
          success: 'false',
          error: 'BAD REQUEST!'
        })
      }
      chatData.users = [userId, ...chatData.users]
      
      if (req.body.name || req.body.users.length > 1) {
        chatData.name = req.body.name || 'Group'
        chatData.isGroup = true
        chatData.groupAdmin = userId
      }
      else {
        const chatExists = await Chat.findOne({
          name: 'sender',
          users: { $all: chatData.users }
        }, { _id: 1 }).lean()

        if (chatExists) {
          return res.status(200).json({
            success: true,
            chat: {
              _id: chatExists._id
            }
          })
        }
        chatData.name = 'sender'
      }
      
      const chat = await Chat.create(chatData)
      await Promise.all(chat.users.map(user => {
        return UnreadMessage.create({
          user: user,
          chat: chat._id,
          total: 0
        })
      }))

      await Chat.populate(chat, { path: 'users', select: 'name' })
      await organizeChatObject(chat, userId.toString())
      
      res.status(201).json({
        success: true,
        chat: {
          _id: chat._id,
          name: chat.name,
          latestMessage: chat.latestMessage ? chat.latestMessage.content : null,
          pic: chat.pic,
          unread: 0
        }
      })
    }
    catch(err) {
      res.status(500).json({
        success: false,
        error: 'An error has occured, please try again!'
      })
    }
  },
  async getChatDetails(req, res) {
    try {
      const userId = req.user._id
      const { chatId } = req.params
      const chat = await Chat.findOne(
        {
          _id: chatId,
          users: userId
        }, {
          name: 1,
          isGroup: 1,
          users: 1,
          groupAdmin: 1
        }).populate('users', { _id: 1, name: 1 }).lean()

      if (!chat) {
        return res.status(403).json({
          success: false,
          error: 'You do not have access to this chat!'
        })
      }

      await organizeChatObject(chat, userId.toString())

      res.status(200).json({
        success: true,
        chat: chat
      })
    }
    catch(err) {
      res.status(500).json({
        success: false,
        error: 'An error has occured, please try again!'
      })
    }
  },
  async editGroupMembers(req, res) {
    try {
      const userId = req.user._id
      const { chatId } = req.params
      const { users } = req.body

      if (!users) {
        return res.status(400).json({
          success: 'false',
          error: 'BAD REQUEST!'
        })
      }

      let validUsers = await validateUserId([...new Set(users)], userId.toString())
      if (validUsers.length === 0) {
        return res.status(400).json({
          success: 'false',
          error: 'Group chat should have at least two users!'
        })
      }
      validUsers = [userId, ...validUsers]
      
      await Chat.updateOne({
        _id: chatId,
        groupAdmin: userId
      }, {
        $set: { users: validUsers }
      }).lean()

      await Promise.all(validUsers.map(async (user) => {
        const unreadMessageExists = await UnreadMessage.findOne({
          user: user,
          chat: chatId
        }, { _id: 1 }).lean()
        if (!unreadMessageExists) {
          return UnreadMessage.create({
            user: user,
            chat: chatId,
            total: 0
          })
        }
        return unreadMessageExists
      }))

      await UnreadMessage.deleteMany({
        user: { $nin: validUsers },
        chat: chatId
      }).lean()

      res.status(204).json({
        success: true
      })
    }
    catch(err) {
      res.status(500).json({
        success: false,
        error: 'An error has occured, please try again!'
      })
    }
  },
  async leaveGroup(req, res) {
    try {
      const userId = req.user._id
      const { chatId } = req.params

      await Chat.updateOne({
        _id: chatId
      }, {
        $pull: { users: userId }
      }).lean()

      await UnreadMessage.deleteOne({
        user: userId,
        chat: chatId
      }).lean()

      res.status(204).json({
        success: true
      })
    }
    catch(err)  {
      res.status(500).json({
        success: false,
        error: 'An error has occured, please try again!'
      })
    }
  },
  async deleteGroup(req, res) {
    try {
      const userId = req.user._id
      const { chatId } = req.params

      const chat = await Chat.findOneAndDelete({
        _id: chatId,
        groupAdmin: userId
      }, {
        projection: { users: 1 }
      }).lean()

      await UnreadMessage.deleteMany({
        user: { $in: chat.users },
        chat: chatId
      }).lean()

      res.status(204).json({
        success: true
      })
    }
    catch(err)  {
      res.status(500).json({
        success: false,
        error: 'An error has occured, please try again!'
      })
    }
  }
}