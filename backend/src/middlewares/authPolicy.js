const Joi = require('joi')

module.exports = {
  register(req, res, next) {
    const schema = Joi.object({
      name: Joi.string().trim().max(25).pattern(/^[a-zA-Z0-9 ]+$/).required().error(errors => {
        errors.forEach(err => {
          switch (err.code) {
            case 'string.max':
              err.message = 'Name should not have more than 25 characters!'
              break
            case 'string.pattern.base':
              err.message = 'Name should only have alphanumeric characters and spaces!'
              break
            default:
              err.message = 'Please provide a name for your account!'
              break
          }
        })
        return errors
      }),

      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required()
        .error(errors => {
          errors.forEach(err => {
            switch (err.code) {
              case 'string.email':
                err.message = 'Please provide a valid email address!'
                break
              default:
                err.message = 'Please provide an email for your account!'
                break
            }
          })
          return errors
        }),

      password: Joi.string().min(8).max(32).alphanum().required().error(errors => {
        errors.forEach(err => {
          switch (err.code) {
            case 'string.min':
            case 'string.max':
            case 'string.alphanum':
              err.message = 'Password should only have 8-32 alphanumeric characters!'
              break
            default:
              err.message = 'Please provide a password for your account!'
              break
          }
        })
        return errors
      }),

      pic: Joi.string()
        .trim()
        .pattern(/^https:\/\/firebasestorage\.googleapis\.com\/v0\/b\/mern\-chat\-app\-d7304\.appspot\.com\/o\/images%2F.+\?alt=media&token=.+$/)
        .error(errors => {
          errors.forEach(err => {
            err.message = 'The image should not exceed 30MB!'
          })
          return errors
        })
    })

    const { error } = schema.validate(req.body, { abortEarly: false })
    if (error) {
      let errorObject = {}
      error.details.forEach(err => {
        errorObject = {
          ...errorObject,
          [err.context.key]: err.message
        }
      })
      return res.status(400).json({
        success: false,
        error: errorObject
      })
    }
    next()
  }
}