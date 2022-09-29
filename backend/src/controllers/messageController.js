const Promise = require('bluebird')
const { Chat, Message, UnreadMessage } = require('../models')

module.exports = {
  async getAllMessages(req, res) {
    try {
      const userId = req.user._id
      const { chatId } = req.params
      const chatExists = await Chat.findOne({
        _id: chatId,
        users: userId
      }, { _id: 1 }).lean()

      if (!chatExists) {
        return res.status(403).json({
          success: false,
          error: 'You do not have access to this chat!'
        })
      }

      const messages = await Message.find(
        {
          chat: chatId
        }, {
          sender: 1,
          content: 1
        })
        .sort({ createdAt: 1 })
        .populate('sender', { name: 1, email: 1, pic: 1 })
        .lean()

      res.status(200).json({
        success: true,
        messages: messages
      })
    }
    catch(err) {
      res.status(500).json({
        success: false,
        error: 'An error has occured, please try again!'
      })
    }
  },
  async createMessage(req, res) {
    try {
      const userId = req.user._id
      const chatExists = await Chat.findOne({
        _id: req.body.chatId,
        users: userId
      }, { users: 1 }).lean()

      if (!chatExists) {
        return res.status(403).json({
          success: false,
          error: 'You do not have access to this chat!'
        })
      }

      const message = await Message.create({
        sender: userId,
        content: req.body.content,
        chat: req.body.chatId
      })
      await Message.populate(message, { path: 'sender', select: { name: 1, email: 1, pic: 1 } })
      await Chat.updateOne({ _id: message.chat }, { $set: { latestMessage: message._id }}).lean()
      await Promise.all(chatExists.users.map(user => {
        if (user.toString() !== userId.toString()) {
          return UnreadMessage.updateOne({
            user: user,
            chat: req.body.chatId
          }, {
            $inc: { total: 1 }
          }).lean()
        }
        return null
      }))
      
      res.status(201).json({
        success: true,
        message: {
          _id: message._id,
          sender: message.sender,
          content: message.content
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
  async markAsUnread(req, res) {
    try {
      const userId = req.user._id
      const { chatId } = req.params
      await UnreadMessage.updateOne({
        user: userId,
        chat: chatId
      }, {
        $inc: { total: 1 }
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
  async markAsRead(req, res) {
    try {
      const userId = req.user._id
      const { chatId } = req.params
      await UnreadMessage.updateOne({
        user: userId,
        chat: chatId
      }, {
        $set: { total: 0 }
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
  }
}