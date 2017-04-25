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

//check username validation, avoid sql injection
function isValidUser(username) {
    return true
}

/**
 * @api {POST} /register register
 * @apiGroup Authentication
 * @apiDescription register new user
 * @apiExample Example
 *    localhost:3000/register
 *    http://54.169.225.125:3000/register
 * @apiParam {Number} username username required
 * @apiParam {String} password password required
 * @apiParam {String} [role=Member] Admin/Member
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       {"token":"JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZDybQ"}
 *     }
 */
exports.register = function(req, res) {
    let username = req.body.username
    if (!isValidUser(username)) {
        res.status(422).send({error: 'error'})
        return
    }

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
                token: `JWT ${generateToken(userInfo)}`
            })
        })
    })
}

/**
 * @api {POST} /login login
 * @apiGroup Authentication
 * @apiDescription login
 * @apiExample Example
 *    localhost:3000/login
 *    http://54.169.225.125:3000/login
 * @apiParam {Number} username username required
 * @apiParam {String} password password required
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         {"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVChmEL_WRt-0P_weF8r41m0eEbryPQ-smyRi2iuMCJoCA","user":{"username":"14020800","role":"Member"}}
 *     }
 */

exports.login = function(req, res) {
    const userInfo = getUserInfo(req)
    console.log(userInfo.yellow)

    res.status(200).send({
        token: generateToken(userInfo),
        user: userInfo,
    })
}
