
const ROLE = require('../config/role')
const User = require('../models/user')
const Schedule = require('../models/schedule')
const Event = require('../models/event')
const mongoose = require('mongoose')

/**
 * @api {GET} /api/users/:username get user
 * @apiGroup User
 * @apiDescription fetch user's profile
 * @apiExample Example
 *    localhost:3000/api/users/14020791
 *    http://54.169.225.125:3000/api/users/14020791
 * @apiHeader (Authorization) {String} Authorization JWT  + token
 * @apiHeaderExample {json} Header example:
 *    {
 *        Authorization: JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1lb2RvcmV3YW4iLCJwYXNz
 *    }
 * @apiParam {Number} username username
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
    if (req.user.username != req.params.username) {
        res.status(403).send('forbidden, cannot get this user')
        return
    }

    console.log(`@ GET profile `.yellow + req.params.username.blue)

    User.findOne({username: req.params.username}, (err, user) => {
        if (err) {
            res.status(204).send('oops something wrong')
            return
        }
        if (!user) {
            res.status(404).send('not found')
            return
        }

        res.status(200).send(user)
    })
}

/**
 * @api {GET} /api/users get users
 * @apiGroup User
 * @apiDescription fetch all users, ROLE Admin required
 * @apiExample Example
 *    localhost:3000/api/users
 *    http://54.169.225.125:3000/api/users
 * @apiHeader (Authorization) {String} Authorization JWT  + token
 * @apiHeaderExample {json} Header example:
 *    {
 *        Authorization: JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1lb2RvcmV3YW4iLCJwYXNz
 *    }
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *      {
 *        "_id":"58fb715925678e616f584e65",
 *        "role":"Admin",
 *        "password":"$2a$10$aWKevQChzMRW7f66FYSwauTXqGOo3iKywbhVm9X1f15Qe4XgPj1ia",
 *        "username":"14020791",
 *        "__v":0
 *      }
 *     ]
 */
exports.getUsers = function (req, res) {
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
                    res.status(204).send('oops can not fetch all users');
                    return
                }
                res.status(200).send(users)
            })
        } else {
            res.status(403).send('forbidden, cannot fetch all users');
        }
    })
}

/**
 * @api {GET} /api/schedules get schedules
 * @apiGroup Schedule
 * @apiDescription get personal schedule
 * @apiExample Example
 *    localhost:3000/api/schedule
 *    http://54.169.225.125:3000/api/schedule
 * @apiHeader (Authorization) {String} Authorization JWT + token
 * @apiHeaderExample {json} Header example:
 *    {
 *        Authorization: JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1lb2RvcmV3YW4iLCJwYXNz
 *    }
 * @apiParam {Number} [username] Admin permission
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
 * @api {GET} /api/events get Events
 * @apiGroup Event
 * @apiDescription get Events
 * @apiExample Example
 *    localhost:3000/api/events
 *    http://54.169.225.125:3000/api/events
 * @apiHeader (Authorization) {String} Authorization JWT + token
 * @apiHeaderExample {json} Header example:
 *    {
 *        Authorization: JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1lb2RvcmV3YW4iLCJwYXNz
 *    }
 * @apiParam {Number} [username=none] Admin permission
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [{"_id":"5902127813081b03c04a39be","weekRepeating":false,"allDay":true,"title":"pussy","priority":0,"end":1,"begin":0,"description":"pussy","owner":"14020791","__v":0}]
 */

exports.getEvent = function (req, res) {
    console.log(`@ GET Event`.yellow + req.user.username.blue)

    User.findOne({username: req.user.username}, (err, user) => {
        if (err) {
            res.status(204).send('Oops something wrong')
            return
        }
        if (user.role == ROLE.ADMIN) {
            let username = req.body.username || req.user.username
            Event.find({owner: username}, (err, data) => {
                if (err) {
                    res.status(204).send('Oops something wrong')
                    return
                }
                res.status(200).send(data)
                return
            })
        } else {
            Event.find({owner: req.user.username}, (err, data) => {
                if (err) {
                    res.status(204).send('Oops something wrong')
                    return
                }
                res.status(200).send(data)
            })
        }
    })
}

/**
 * @api {POST} /api/events create Event
 * @apiGroup Event
 * @apiDescription add a Event
 * @apiExample Example
 *    localhost:3000/api/events
 *    http://54.169.225.125:3000/api/events
 * @apiHeader (Authorization) {String} Authorization JWT + token
 * @apiHeaderExample {json} Header example:
 *    {
 *        Authorization: JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1lb2RvcmV3YW4iLCJwYXNz
 *    }
 * @apiParam {Number} username username
 * @apiParam {String} [description=empty] description
 * @apiParam {Number} [begin=0] start
 * @apiParam {Number} [end=0] deadline
 * @apiParam {Number} [priority=0] priority
 * @apiParam {String} [title=empty] title
 * @apiParam {String} [location=empty] location
 * @apiParam {Boolean} [allDay=false] repeat all days of week
 * @apiParam {Boolean} [weekRepeating=false] repeat weekly
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {"EventId":"58feaf6ab8884123142e8bb1"}
 */

exports.newEvent = function (req, res) {
    console.log(`@ GET Event`.yellow + req.user.username.blue)

    User.findOne({username: req.user.username}, (err, user) => {
        if (err) {
            res.status(204).send('oops something wrong')
            return
        }
        let username = req.user.username
        if (user.role == ROLE.ADMIN)
            username = req.body.username || username
        let event = new Event()
        event.owner = username
        event.description = req.body.description || ''
        event.begin = req.body.begin || 0
        event.end = req.body.end || 0
        event.priority = req.body.priority || 0
        event.title = req.body.title || ''
        event.allDay = req.body.allDay == 'true' ? true : false
        event.weekRepeating = req.body.weekRepeating == 'true' ? true : false
        event.save((err, n) => {
            if (err) {
                res.status(204).send('oops, can not create new Event')
                return
            }
            res.status(200).send({
                eventId: n._id
            })
        })
    })
}

/**
 * @api {PUT} /api/events modify Event
 * @apiGroup Event
 * @apiDescription modify an existing Event
 * @apiExample Example
 *    localhost:3000/api/events
 *    http://54.169.225.125:3000/api/events
 * @apiHeader (Authorization) {String} JAuthorization WT + token
 * @apiHeaderExample {json} Header example:
 *    {
 *        Authorization: JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1lb2RvcmV3YW4iLCJwYXNz
 *    }
 * @apiParam {id} ObjectId objectId required
 * @apiParam {String} [description=empty] description
 * @apiParam {Number} [begin=0] start
 * @apiParam {Number} [end=0] deadline
 * @apiParam {Number} [priority=0] priority
 * @apiParam {String} [title=empty] title
 * @apiParam {String} [location=empty] location
 * @apiParam {Boolean} [allDay=false] repeat all days of week
 * @apiParam {Boolean} [weekRepeating=false] repeat weekly
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "ok ok!!"
 *     }
 */

exports.modifyEvent = function(req, res) {
    let username = req.user.username

    let EventID = req.query.id
    if (!mongoose.Types.ObjectId.isValid(EventID)){
        res.status(400).send('bad request, id field must be specified')
        return
    }


    Event.findById({_id: EventID}, (err, event) => {
        if (err) {
            console.log(data.red)
            return
        }
        if (!event) {
            res.status(404).send('not found')
            return
        }
        if (event.owner !== username) {
            res.status(204).send('you cant modify Event of other')
            return
        }
        event.description = req.body.description || Event.description
        event.begin = req.body.begin || Event.begin
        event.end = req.body.end || Event.end
        event.priority = req.body.priority || Event.priority
        event.title = req.body.title || Event.title
        event.allDay = req.body.allDay == 'true' ? true : false
        event.weekRepeating = req.body.weekRepeating == 'true' ? true : false
        event.save((err, success) => {
            if (err) {
                res.status(204).send('oops something wrong')
                return
            }
            res.status(200).send('ok ok!!')
        })
    })
}

/**
 * @api {DELETE} /api/events delete Event
 * @apiGroup Event
 * @apiDescription delete an existing Event
 * @apiExample Example
 *    localhost:3000/api/events
 *    http://54.169.225.125:3000/api/events
 * @apiHeader (Authorization) {String} Authorization JWT + token
 * @apiHeaderExample {json} Header example:
 *    {
 *        Authorization: JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1lb2RvcmV3YW4iLCJwYXNz
 *    }
 * @apiParam {id} ObjectId objectId required
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "ok ok!!"
 *     }
 */

exports.deleteEvent = function(req, res) {
    let username = req.user.username

    let EventId = req.query.id
    console.log(EventId)
    if (!mongoose.Types.ObjectId.isValid(EventId)){
        res.status(400).send('bad request, id field must be specified')
        return
    }

    Event.findByIdAndRemove({_id: EventId}, (err) => {
        if (err) {
            console.log(data.red)
            return
        }
        res.status(200).send('ok ok!!')
    })
}