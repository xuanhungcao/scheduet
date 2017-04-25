const ROLE = require('../config/role')
const User = require('../models/user')
const Schedule = require('../models/schedule')
const Note = require('../models/note')
const mongoose = require('mongoose')

/**
 * @api {GET} /api/users/:username
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
  if (!req.params.username) {
    res.status(400).send('bad request, missing username field')
    return
  }
  if (!Number.isInteger(Number(req.params.username))) {
    res.status(400).send('bad request, username must be numeric')
    return
  }
  console.log(`@ GET profile `.yellow + req.params.username.blue)

  User.findOne({username: req.user.username}, (err, user) => {
    if (err) {
      res.status(204).send('oops something wrong')
      return
    }
    if (!user) {
      res.status(404).send('not found')
      return
    }
    if (user.role == ROLE.ADMIN) {
      User.find({}, (err, users) => {
        if (err) {
          res.status(204).send('oops can not fetch all users')
          return
        }
        res.status(200).send(users)
      })
    }
    else res.status(200).send(user)
  })
}

/**
 * @api {GET} /api/schedules
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
 *     [{
 *       "_id":"58fe3349c162224e9707865c",
 *       "info":{
 *          "Ghi chú":"ĐK lần đầu",
 *          "Họ và tên":"Nguyễn Trọng Đông",
 *          "Lớp khoá học":"QH-2014-I/CQ-C-A",
 *          "Mã LMH":"PES1030 8",
 *          "Mã SV":"14020791",
 *          "Ngày sinh":"13/8/1996",
 *          "Nhóm":"CL",
 *          "STT":"81",
 *          "Số TC":"1",
 *          "Tên môn học":"Bóng bàn"
 *        },
 *        "__v":1,
 *        "module": {
 *          "__v":0,
 *          "Mã học phần":"PES 1030",
 *          "Học Phần":"Bóng bàn 1",
 *          "TC":1,
 *          "Mã LHP":"PES 1030 8",
 *          "SS DK":45,
 *          "Giảng viên":"TT GDTC",
 *          "Buổi":"Chiều",
 *          "Thứ":3,
 *          "Tiết":"8-9",
 *          "Giảng đường":"Sân bãi",
 *          "Ghi chú":"",
 *          "_id":"58fe378c3d91cf5327776c1c"}
 *        }
 *      }]
 */
exports.getSchedule = function (req, res) {
  console.log(`@ GET schedule `.yellow + req.user.username.blue)

  User.findOne({username: req.user.username}, (err, user) => {
    if (err) {
      res.status(204).send('oops something wrong')
      return
    }
    if (user.role == ROLE.ADMIN) {
      let username = req.body.username || req.user.username
      Schedule.find({'info.Mã SV' : username}, (err, data) => {
        if (err) {
          res.status(204).send('oops something wrong')
          return
        }
        res.status(200).send(data)
        return
      })
    } else {
      Schedule.find({'info.Mã SV': req.user.username}, (err, data) => {
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
 * @api {GET} /api/notes
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
 *     [ {"_id":"58fea1fa7f255612309b6872","type":"ugent","priority":3,"end":1,"begin":2,"description":"buy milk if they have eggs, bring 6","owner":"14020791","__v":0},
 *       {"_id":"58fea8cc5442e11c9821f9e6","type":"ugent","priority":3,"end":1,"begin":2,"description":"buy milk if they have eggs, bring 6","owner":"14020791","__v":0}
 *     ]
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
      Note.find({owner: username}, (err, data) => {
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
 * @api {POST} /api/notes
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
 *     {"noteID":"58feaf6ab8884123142e8bb1"}
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
    let note = new Note()
    note.owner = username
    note.description = req.body.description || 'empty'
    note.begin = req.body.begin || 0
    note.end = req.body.end || 0
    note.priority = req.body.priority || 0
    note.type = req.body.type || 'basic'
    note.other = req.body.other
    note.save((err, n) => {
      if (err) {
        res.status(204).send('oops, can not create new note')
        return
      }
      res.status(200).send({
        noteID: n._id
      })
    })
  })
}

/**
 * @api {PUT} /api/notes
 * @apiDescription modify an existing note
 * @apiExample localhost:3000/api/note
 * @apiHeader (Authorization) {String} JWT + token
 * @apiHeaderExample {json} Header example:
 *    {
 *        Authorization: JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1lb2RvcmV3YW4iLCJwYXNz
 *    }
 * @apiParam {id} [ObjectId] objectId required
 * @apiParam {String} [description] description [OPTIONAL, default empty]
 * @apiParam {Number} [begin] start [OPTIONAL, default 0]
 * @apiParam {Number} [end] deadline [OPTIONAL, default 0]
 * @apiParam {Number} [priority] priority [OPTIONAL, default 0]
 * @apiParam {String} [type] type [OPTIONAL, default basic]
 * @apiParam {json} [other [OPTIONAL]
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "ok ok!!"
 *     }
 */

exports.modifyNote = function(req, res) {
  let username = req.user.username

  let noteID = req.query.id
  if (!mongoose.Types.ObjectId.isValid(noteID)){
    res.status(400).send('bad request, id field must be specified')
    return
  }

  Note.findById({_id: noteID}, (err, note) => {
    if (err) {
      console.log(data.red)
      return
    }
    if (!note) {
      res.status(404).send('not found')
      return
    }
    if (note.owner !== username) {
      res.status(204).send('you cant modify note of other')
      return
    }
    note.description = req.query.description || note.description
    note.begin = req.query.begin || note.begin
    note.end = req.query.end || note.end
    note.priority = req.query.priority || note.priority
    note.type = req.query.type || note.type
    note.other = req.query.other || note.other
    note.save((err, success) => {
      if (err) {
        res.status(204).send('oops something wrong')
        return
      }
      res.status(200).send('ok ok!!')
    })
  })
}

/**
 * @api {DELETE} /api/notes/:noteId
 * @apiDescription delete an existing note
 * @apiExample localhost:3000/api/note/58feaf6ab8884123142e8bb1
 * @apiHeader (Authorization) {String} JWT + token
 * @apiHeaderExample {json} Header example:
 *    {
 *        Authorization: JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1lb2RvcmV3YW4iLCJwYXNz
 *    }
 * @apiParam {id} [ObjectId] objectId required
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "ok ok!!"
 *     }
 */

exports.deleteNote = function(req, res) {
  let username = req.user.username

  let noteId = req.params.noteId
  if (!mongoose.Types.ObjectId.isValid(noteId)){
    res.status(400).send('bad request, id field must be specified')
    return
  }

  Note.findByIdAndRemove({_id: noteId}, (err) => {
    if (err) {
      console.log(data.red)
      return
    }
    res.status(200).send('ok ok!!')
  })
}
