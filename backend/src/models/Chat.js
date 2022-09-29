module.exports = (Schema, model) => {
  const ChatSchema = new Schema(
    {
      name: { type: String },
      isGroup: { type: Boolean, default: false },
      users: [
        {
          type: Schema.Types.ObjectId,
          ref: 'User'
        }
      ],
      latestMessage: {
        type: Schema.Types.ObjectId,
        ref: 'Message'
      },
      groupAdmin: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    },
    { timestamps: true }
  )

  const Chat = model('Chat', ChatSchema)
  return Chat
}