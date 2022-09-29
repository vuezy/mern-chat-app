module.exports = (Schema, model) => {
  const UnreadMessageSchema = new Schema(
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      },
      chat: {
        type: Schema.Types.ObjectId,
        ref: 'Chat'
      },
      total: { type: Number }
    },
    { timestamps: true }
  )

  const UnreadMessage = model('UnreadMessage', UnreadMessageSchema)
  return UnreadMessage
}