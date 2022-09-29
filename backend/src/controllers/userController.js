const { User, Chat } = require('../models')

module.exports = {
  async searchUser(req, res) {
    try {
      const userId = req.user._id
      const { search } = req.query
      if (!search) {
        return res.status(200).json({
          success: true,
          users: []
        })
      }

      const users = await User.find({
        _id: { $ne: userId },
        $or: [
          {
            name: {
              $regex: '.*' + search + '.*',
              $options: 'i'
            }
          },
          {
            email: {
              $regex: '.*' + search + '.*',
              $options: 'i'
            }
          }
        ]
      }, { name: 1, email: 1, pic: 1 }).limit(8).lean()

      res.status(200).json({
        success: true,
        users: users
      })
    }
    catch(err) {
      res.status(500).json({
        success: false,
        error: 'An error has occured, please try again!'
      })
    }
  },
  async searchUserInGroupModal(req, res) {
    try {
      const userId = req.user._id
      const { search, chatId } = req.query
      if (!search) {
        return res.status(200).json({
          success: true,
          users: []
        })
      }
      
      if (chatId) {
        const chat = await Chat.findOne({
          _id: chatId,
          groupAdmin: userId
        }, { _id: 1 }).lean()

        if (!chat) {
          return res.status(403).json({
            success: false,
            error: 'You are not the admin of this group!'
          })
        }
      }

      const users = await User.find({
        _id: { $ne: userId },
        $or: [
          {
            name: {
              $regex: '.*' + search + '.*',
              $options: 'i'
            }
          },
          {
            email: {
              $regex: '.*' + search + '.*',
              $options: 'i'
            }
          }
        ]
      }, { name: 1, email: 1, pic: 1 }).limit(3).lean()

      res.status(200).json({
        success: true,
        users: users
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