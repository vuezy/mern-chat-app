const Joi = require('joi')

module.exports = {
  createMessage(req, res, next) {
    const schema = Joi.object({
      chatId: Joi.string().required().error(errors => {
        errors.forEach(err => {
          err.message = 'BAD REQUEST!'
        })
        return errors
      }),
      content: Joi.string().min(1).max(200).required().error(errors => {
        errors.forEach(err => {
          switch (err.code) {
            case 'string.max':
              err.message = 'A message has a limit of 200 characters!'
              break
            default:
              err.message = 'BAD REQUEST!'
              break
          }
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