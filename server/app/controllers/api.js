
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
 *    localhost:3000/api/users/meodorewan
 *    http://54.169.225.125:3000/api/users/meodorewan
 * @apiHeader (Authorization) {String} Authorization JWT  + token
 * @apiHeaderExample {json} Header example:
 *    {
 *        Authorization: JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1lb2RvcmV3YW4iLCJwYXNz
 *    }
 * @apiParam {String} username username
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "_id":"58fb715925678e616f584e65",
 *        "password":"$2a$10$aWKevQChzMRW7f66FYSwauTXqGOo3iKywbhVm9X1f15Qe4XgPj1ia",
 *        "username":"meodorewan",
 *        "studentId": 14020791,
 *        "__v":0
 *     }
 */

exports.getProfile = function (req, res) {
    if (!req.params.username) {
        res.status(400).send('Bad request, missing username field')
        return
    }
    if (req.user.username != req.params.username) {
        res.status(403).send('Forbidden, cannot get this user')
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
 * @api {POST} /api/users/:username modify user
 * @apiGroup User
 * @apiDescription modify user's profile
 * @apiExample Example
 *    localhost:3000/api/users/meodorewan
 *    http://54.169.225.125:3000/api/users/meodorewan
 * @apiHeader (Authorization) {String} Authorization JWT  + token
 * @apiHeaderExample {json} Header example:
 *    {
 *        Authorization: JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1lb2RvcmV3YW4iLCJwYXNz
 *    }
 * @apiParam {String} username username
 * @apiParam {Number} studentId studentId
 * @apiParam {password} password password
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "ok ok!!!"
 *     }
 */

exports.putProfile = function (req, res) {
    if (!req.params.username) {
        res.status(400).send('Bad request, missing username field')
        return
    }
    if (req.user.username != req.params.username) {
        res.status(403).send('Forbidden, cannot update this user')
        return
    }

    console.log(`@ GET profile `.yellow + req.params.username.blue)

    User.findOne({username: req.params.username}, (err, user) => {
        if (err) {
            res.status(204).send('Something wrong')
            return
        }
        if (!user) {
            res.status(404).send('not found')
            return
        }
        user.studentId = req.body.studentId
        user.password = user.encrypt(req.body.password)
        user.save((err, done) => {
            if (err) {
                res.status(204).send('Something wrong')
                return
            }
            res.status(200).send("ok ok!!!")
        })
    })
}
/*=================================================================================*/
//      EVENTS

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
            res.status(204).send('Something wrong')
            return
        }
        /*if (req.user.studentId) //search studentId
            Event.find( {studentId: req.user.studentId} , (err, data) => {
                if (err) {
                    res.status(204).send('Something wrong')
                    return
                }
                res.status(200).send(data)
            })
        else */
        Event.find( {$or : [{owner: req.user.username}, {studentId: req.user.studentId}] } , (err, data) => {
            if (err) {
                res.status(204).send('Something wrong')
                    return
                }
                res.status(200).send(data)
        })
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

exports.postEvent = function (req, res) {
    console.log(`@ POST Event`.yellow + req.user.username.blue)

    User.findOne({username: req.user.username}, (err, user) => {
        if (err) {
            res.status(204).send('Something wrong')
            return
        }

        let event = new Event()
        console.log(typeof(req.body.repeat));
        event.owner = req.user.username
        event.title = req.body.title
        event.description = req.body.description
        event.start = req.body.start
        event.end = req.body.end
        event.allDay = req.body.allDay == 'true' ? true : false
        event.repeat = req.body.repeat 
        event.endRepeat = req.body.endRepeat
        event.color = req.body.color
        event.other = req.body.other
        event.save((err, n) => {
            if (err) {
                res.status(204).send('Can not create new Event')
                return
            }
            res.status(200).send({
                _id : n._id
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

exports.putEvent = function (req, res) {
    console.log(`@ PUT Event`.yellow + req.user.username.blue)

    User.findOne({username: req.user.username}, (err, user) => {
        if (err) {
            res.status(204).send('oops something wrong')
            return
        }

        Event.findOne({ _id : req.body._id}, (err, event) => {
            if (err) {
                res.status(204).send('oops something wrong')
                return
            }
            if (!event) {
                res.status(404).send('not found')
                return
            }
            event.owner = req.user.username
            event.title = req.body.title
            event.description = req.body.description
            event.start = req.body.start
            event.end = req.body.end
            event.allDay = req.body.allDay == 'true' ? true : false
            event.repeat = req.body.repeat
            event.endRepeat = req.body.endRepeat
            event.color = req.body.color
            event.other = req.body.other
            event.save((err, n) => {
                if (err) {
                    res.status(204).send('Oops, can not update event')
                    return
                }
                res.status(200).send('ok ok!!!')
            })
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

    let EventId = req.query._id
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