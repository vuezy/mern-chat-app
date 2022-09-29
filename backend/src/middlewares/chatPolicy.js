const Joi = require('joi')

module.exports = {
  createChat(req, res, next) {
    const schema = Joi.object({
      name: Joi.string().trim().max(25).pattern(/^[a-zA-Z0-9 ]+$/).invalid('sender').error(errors => {
        errors.forEach(err => {
          switch (err.code) {
            case 'string.max':
              err.message = 'Group name should not have more than 25 characters!'
              break
            case 'string.pattern.base':
              err.message = 'Group name should only have alphanumeric characters and spaces!'
              break
            default:
              err.message = 'Please provide a valid name for your group!'
              break
          }
        })
        return errors
      }),

      users: Joi.array()
        .min(1)
        .items(Joi.string().valid(req.user._id.toString()).forbidden(), Joi.string())
        .required()
        .error(errors => {
          errors.forEach(err => {
            err.message = 'A chat should have at least two users!'
          })
          return errors
        })
    })

    const { error } = schema.validate(req.body)
    if (error) {
      return res.status(400).json({
        success: false,
        error: error.details[0].message
      })
    }
    next()
  }
}