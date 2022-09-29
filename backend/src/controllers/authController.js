const bcrypt = require('bcrypt')
const { User } = require('../models')
const { jwtSignUser } = require('../utils')

module.exports = {
  async getImageId(req, res) {
    try {
      const id = (await User.countDocuments().lean()) + 1
      const SALT_ROUNDS = 10
      const salt = await bcrypt.genSalt(SALT_ROUNDS)
      const hash = await bcrypt.hash(id.toString(), salt)
      const imageId = hash.replace(/\W/g, '-')
      res.status(200).json({
        success: true,
        id: imageId
      })
    }
    catch(err) {
      res.status(500).json({
        success: false,
        error: 'An error has occured, please try again!'
      })
    }
  },
  async register(req, res) {
    try {
      const userExists = await User.findOne({ email: req.body.email }, { _id: 1 }).lean()
      if (userExists) {
        return res.status(400).json({
          success: false,
          error: {
            email: 'User with that email already exists!'
          }
        })
      }
      
      let userData = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      }
      if (req.body.pic) {
        userData.pic = req.body.pic
      }
      const newUser = await User.create(userData)
      const { _id, name, email, pic } = newUser
      res.status(201).json({
        success: true,
        user: {
          _id: _id,
          name: name,
          email: email,
          pic: pic
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
  async login(req, res) {
    try {
      const user = await User.findOne({ email: req.body.email })
      if (!user) {
        return res.status(403).json({
          success: false,
          error: 'Email or password is incorrect!'
        })
      }

      const passwordIsCorrect = await user.comparePassword(req.body.password)
      if (!passwordIsCorrect) {
        return res.status(403).json({
          success: false,
          error: 'Email or password is incorrect!'
        })
      }

      res.status(200).json({
        success: true,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          pic: user.pic
        },
        token: jwtSignUser(user)
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