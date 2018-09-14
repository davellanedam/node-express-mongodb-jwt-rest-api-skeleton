const passport = require('passport')
const User = require('../app/models/user')
const {
  decrypt
} = require('./base')
const JwtStrategy = require('passport-jwt').Strategy

const jwtExtractor = (req) => {
  let token = null
  if (req.headers.authorization) {
    token = req.headers.authorization.replace('Bearer ', '').replace(' ', '')
  } else if (req.body.token) {
    token = req.body.token.replace(' ', '')
  } else if (req.query.token) {
    token = req.query.token.replace(' ', '')
  }
  if (token) {
    token = decrypt(token)
  }
  return token
}

const jwtOptions = {
  jwtFromRequest: jwtExtractor,
  secretOrKey: process.env.JWT_SECRET
}

const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  User.findById(payload._id, (err, user) => {
    if (err) {
      return done(null, false)
    }
    return !user ? done(null, false) : done(null, user)
  })
})

passport.use(jwtLogin)
