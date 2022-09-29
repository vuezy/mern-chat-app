module.exports = (Schema, model) => {
  const MessageSchema = new Schema(
    {
      sender: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      },
      content: { type: String },
      chat: {
        type: Schema.Types.ObjectId,
        ref: 'Chat'
      }
    },
    { timestamps: true }
  )

  const Message = model('Message', MessageSchema)
  return Message
}