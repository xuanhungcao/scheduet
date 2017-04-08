const User        = require('../models/user')
const config      = require('../config/main')
const getUserInfo = require('../helper').getUserInfo
const jwt         = require('jsonwebtoken')

//generate JWT
function generateToken(user) {
    return jwt.sign(user, config.secret, {
        expiresIn: 604800,
    })
}

exports.register = function(req, res) {
    User.findOne({username: req.body.username}, (err, user) => {
        if (err) throw err

        //existing user
        if (user) {
            res.status(422).send({error: 'username is already in use'})
            return
        }

        let newUser = new User()
        newUser.username = req.body.username
        newUser.password = newUser.encrypt(req.body.password)
        newUser.role     = req.body.role || 'Member'

        const userInfo = getUserInfo(req)

        newUser.save((err) => {
            if (err) next(err)
            res.send({
                status: 200,
                token: `JWT ${generateToken(userInfo)}`
            })
        })
    })
}

exports.login = function(req, res) {
    const userInfo = getUserInfo(req)

    res.send({
        token: `JWT ${generateToken(userInfo)}`,
        user: userInfo,
    })
}
