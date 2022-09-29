const passport = require('passport')

module.exports = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err) {
      return res.status(500).json({
        success: false,
        error: 'An error has occured, please try again!'
      })
    }
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'You are not authorized to access this resource!'
      })
    }
    else {
      req.user = user
      next()
    }
  })(req, res, next)
}