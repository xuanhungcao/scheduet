const mongoose = require('mongoose')

const Schedule = require('../app/models/schedule')
const Event = require('../app/models/event')
const Event2 = require('../app/models/event2')
const configDB       = require('../app/config/database')
const Module = require('../app/models/module')
mongoose.connect(configDB.localAddress)

// function toTimeStamp(event) {
//     let day = event['Thứ']
//     let date = ''
//     switch (day) {
//         case 2:
//             date = '01-Feb-2017 '
//             break
//         case 3:
//             date = '02-Feb-2017 '
//             break
//         case 4:
//             date = '03-Feb-2017 '
//             break
//         case 5:
//             date = '04-Feb-2017 '
//             break
//         case 6:
//             date = '05-Feb-2017 '
//             break
//         case 7:
//             date = '06-Feb-2017 '
//             break
//         default:
//             date = '07-Feb-2017 '
//             break
//     }
//     let start, end
//     if (Number(event['Tiết'].charAt(0)) < 6)
//         start = Number(event['Tiết'].charAt(0)) + 6
//     else
//         start = Number(event['Tiết'].charAt(0)) + 7
//     if (Number(event['Tiết'].substring(2)) < 6)
//         end = Number(event['Tiết'].substring(2)) + 7
//     else
//         end = Number(event['Tiết'].substring(2)) + 8
//
//     return {
//         begin: Date.parse(date + start.toString() + ':00:00'),
//         end: Date.parse(date + end.toString() + ':00:00'),
//     }
// }

// Event.find({}, (err, data) => {
//     data.sort((A, B) => {
//         return A.studentId - B.studentId
//     })
//
//     for (let i = 0; i < data.length; ) {
//         let j = i + 1
//         while (j < data.length && data[j].studentId == data[i].studentId)
//             j++
//         let event2 = new Event2()
//         event2.modules = []
//         for (let t = i; t < j; t++) {
//             event2.modules.push(data[t].other._id)
//             for (let key in data[t])
//                 if (!event2[key])
//                     event2[key] = data[t][key]
//         }
//         console.log(event2)
//         event2.save((err, done) => console.log("done"))
//         i = j
//     }
// })

/*
Schedule.find({}, (err, events) => {
    events.forEach(event => {
        if (!event.module)
            return

        let e = new Event()
        e.owner = null
        e.studentId = event.info['Mã SV']
        e.title = event.info['Tên môn học']
        e.description = `${event.module['Giảng viên']} ${event.module['Giảng đường']}`
        e.start = toTimeStamp(event.module).begin
        e.end = toTimeStamp(event.module).end
        e.allDay = false

        let day = event.module['Thứ'] - 1
        e.repeat = [day]
        e.endRepeat = Date.parse('31-May-2017 23:59:59')
        e.other = Object.assign({}, event.info, event.module)
        e.info = undefined

        e.module = undefined
        e.color = '#3c8dbc'
        e.editable = false
        e.save((err, done)=> {
            console.log('done')
        })
    })
}) */
//
// Event.find({}, (err, data) => {
//     data.forEach(e => {
//         console.log(e.repeat)
//         /*e.repeat[0]++
//         e.save((err, done) => {
//             console.log('done')
//         }) */
//     })
// })

Module.find({}, (err, data) => {
    data.forEach(e => {
        e['Thứ']--
        e.save((err,done) =>{
            console.log('done')
        })
    })
})