const passport  = require('passport')
const LocalStrategy = require('passport-local')
const User = require('../models/user')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt  = require('passport-jwt').ExtractJwt
const config = require('./main')

module.exports = function(app) {

    passport.use(new LocalStrategy(
        function (username, password, done) {
            User.findOne({username: username}, function (err, user) {
                if (err) return done(err)
                if (!user)
                    return done(null, false, {message: 'Incorrect username.'})
                if (!user.validPassword(password))
                    return done(null, false, {message: 'Incorrect password.'})
                return done(null, user)
            })
        }))

    const jwtOptions = {
        jwtFromRequest: ExtractJwt.fromAuthHeader(),
        secretOrKey: config.secret
    }

    passport.use(jwtOptions, new JwtStrategy(jwtOptions, (payload, done) => {
        User.findById(payload._id, (err, user) => {
            if (err) return done(err, false)
            if (user)
              done(null, user)
            else
              done(null, false)
        })
    }))
}

