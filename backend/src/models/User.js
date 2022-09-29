const bcrypt = require('bcrypt')

module.exports = (Schema, model) => {
  const UserSchema = new Schema(
    {
      name: { type: String },
      email: { type: String },
      password: { type: String },
      pic: {
        type: String,
        default: 'https://firebasestorage.googleapis.com/v0/b/mern-chat-app-d7304.appspot.com/o/images%2Fanonymous-avatar.jpg?alt=media&token=9ef7cd12-4b8e-41fc-96eb-7aa919858441'
      }
    },
    { timestamps: true }
  )

  UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next()

    const SALT_ROUNDS = 10
    try {
      const salt = await bcrypt.genSalt(SALT_ROUNDS)
      const hash = await bcrypt.hash(this.password, salt)
      this.password = hash
      next()
    }
    catch(err) {
      return next(err)
    }
  })

  UserSchema.methods.comparePassword = async function(candidatePassword) {
    try {
      const isMatch = await bcrypt.compare(candidatePassword, this.password)
      return isMatch
    }
    catch(err) {
      return false
    }
  }

  const User = model('User', UserSchema)
  return User
}