const fs = require('fs')
const path = require('path')
const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const { User } = require('./models')

const PUB_KEY = fs.readFileSync(__dirname + '/../keypair/rsa_pub_key.pem', 'utf8')
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PUB_KEY,
  algorithms: ['RS256']
}

passport.use(
  new JwtStrategy(options, async (jwtPayload, done) => {
    try {
      const user = await User.findById(jwtPayload.sub, { _id: 1 }).lean()
      if (user) {
        return done(null, user)
      }
      return done(null, false)
    }
    catch(err) {
      return done(err, false)
    }
  })
)