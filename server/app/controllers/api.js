const ROLE = require('../config/role')
const User = require('../models/user')
const Schedule = require('../models/schedule')

/**
 * @api {GET} /api/:username
 * @apiDescription fetch users, ROLE required
 * @apiExample localhost:3000/api/14020791
 * @apiHeader (Authorization) {String} JWT + token
 * @apiHeaderExample {json} Header example:
 *    {
 *        Authorization: JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1lb2RvcmV3YW4iLCJwYXNz
 *    }
 * @apiParam {Number} [username] username
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "_id":"58fb715925678e616f584e65",
 *        "role":"Admin",
 *        "password":"$2a$10$aWKevQChzMRW7f66FYSwauTXqGOo3iKywbhVm9X1f15Qe4XgPj1ia",
 *        "username":"14020791",
 *        "__v":0
 *     }
 */

exports.getProfile = function (req, res) {
  /** @Author: DONG Mar 24 2017
   *   @Description: check valid request
   */
  if (!req.param.username) {
    res.status(400).send('bad request, missing username field')
    return
  }
  if (Number.isInteger(Number(req.param.username))) {
    res.status(400).send('bad request, username must be numeric')
    return
  }

  /** @Author: DONG Mar 24 2017
   *  @Description: Fetch users
   */
  console.log(`@ GET profile `.yellow + username.blue)

  User.findOne({username: req.param.username}, (err, user) => {
    if (err) {
      res.status(204).send('oops something wrong')
      return
    }
    if (user.role == ROLE.ADMIN) {
      user.find({}, (err, users) => {
        if (err) {
          res.status(204).send('oops can not fetch all users')
          return
        }
        res.status(200).send(users)
      })
    }
  })
}

/**
 * @api {GET} /api/schedule
 * @apiDescription get personal schedule
 * @apiExample localhost:3000/api/schedule
 * @apiHeader (Authorization) {String} JWT + token
 * @apiHeaderExample {json} Header example:
 *    {
 *        Authorization: JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1lb2RvcmV3YW4iLCJwYXNz
 *    }
 * @apiParam {Number} [username] username[Admin only, OPTIONAL]
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [schedule1, schedule2]
 */
exports.getSchedule = function (req, res) {
  console.log(`@ GET schedule`.yellow + req.user.username.blue)

  User.findOne({username: req.user.username}, (err, user) => {
    if (err) {
      res.status(204).send('oops something wrong')
      return
    }
    if (user.role == ROLE.ADMIN) {
      let username = req.body.username || req.user.username
      Schedule.find({username: username}, (err, data) => {
        if (err) {
          res.status(204).send('oops something wrong')
          return
        }
        res.status(200).send(data)
        return
      })
    } else {
      Schedule.find({owner: req.user.username}, (err, data) => {
        if (err) {
          res.status(204).send('oops something wrong')
          return
        }
        res.status(200).send(data)
      })
    }
  })
}

/**
 * @api {GET} /api/note
 * @apiDescription get personal notes
 * @apiExample localhost:3000/api/note
 * @apiHeader (Authorization) {String} JWT + token
 * @apiHeaderExample {json} Header example:
 *    {
 *        Authorization: JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1lb2RvcmV3YW4iLCJwYXNz
 *    }
 * @apiParam {Number} [username] username[Admin only, OPTIONAL]
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        [note1, note2, note3]
 *     }
 */

exports.getNote = function (req, res) {
  console.log(`@ GET note`.yellow + req.user.username.blue)

  User.findOne({username: req.user.username}, (err, user) => {
    if (err) {
      res.status(204).send('oops something wrong')
      return
    }
    if (user.role == ROLE.ADMIN) {
      let username = req.body.username || req.user.username
      Note.find({username: username}, (err, data) => {
        if (err) {
          res.status(204).send('oops something wrong')
          return
        }
        res.status(200).send(data)
        return
      })
    } else {
      Note.find({owner: req.user.username}, (err, data) => {
        if (err) {
          res.status(204).send('oops something wrong')
          return
        }
        res.status(200).send(data)
      })
    }
  })
}

/**
 * @api {POST} /api/note
 * @apiDescription add a note
 * @apiExample localhost:3000/api/note
 * @apiHeader (Authorization) {String} JWT + token
 * @apiHeaderExample {json} Header example:
 *    {
 *        Authorization: JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1lb2RvcmV3YW4iLCJwYXNz
 *    }
 * @apiParam {Number} [username] username required
 * @apiParam {String} [description] description [OPTIONAL, default empty]
 * @apiParam {Number} [begin] start [OPTIONAL, default 0]
 * @apiParam {Number} [end] deadline [OPTIONAL, default 0]
 * @apiParam {Number} [priority] priority [OPTIONAL, default 0]
 * @apiParam {String} [type] type [OPTIONAL, default basic]
 * @apiParam {json} [other [OPTIONAL]
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "noteID": 124322545,
 *     }
 */

exports.newNote = function (req, res) {
  console.log(`@ GET note`.yellow + req.user.username.blue)

  User.findOne({username: req.user.username}, (err, user) => {
    if (err) {
      res.status(204).send('oops something wrong')
      return
    }
    let username = req.user.username
    if (user.role == ROLE.ADMIN)
      username = req.body.username || username
    let node = new Node()
    node.owner = username
    node.description = req.body.description || 'empty'
    node.begin = req.body.begin || 0
    node.end = req.body.end || 0
    node.priority = req.body.priority || 0
    node.type = req.body.type || 'basic'
    node.other = req.body.other
    node.save((err, n) => {
      if (err) {
        res.status(204).send('oops, can not create new note')
        return
      }
      res.status(200).send({
        nodeID: n._id
      })
    })
  })
}
