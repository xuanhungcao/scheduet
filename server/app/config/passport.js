const passport  = require('passport')
const LocalStrategy = require('passport-local')
const User = require('../models/user')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt  = require('passport-jwt').ExtractJwt
const config = require('./main')
const colors = require('colors')

module.exports = function(app) {

    passport.use(new LocalStrategy(
        function (username, password, done) {

            console.log('@ LOGIN: '.green)

            User.findOne({username: username}, function (err, user) {
                if (err) return done(err)
                if (!user)
                    return done(null, false, {message: 'Incorrect username.'})

                if (!user.validPassword(user, password))
                    return done(null, false, {message: 'Incorrect password.'})

                return done(null, user)
            })
        }))

    const jwtOptions = {
        jwtFromRequest: ExtractJwt.fromAuthHeader(),
        secretOrKey: config.secret
    }

    passport.use(new JwtStrategy(jwtOptions, (payload, done) => {
        if (!payload.username) {
            done(null, false);
            return
        }
        User.findOne({username: payload.username}, (err, user) => {
            if (err) return done(err, false)
            if (user)
              done(null, user)
            else
              done(null, false)
        })
    }))
}

