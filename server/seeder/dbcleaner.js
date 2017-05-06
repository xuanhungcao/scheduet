const mongoose = require('mongoose')

const Schedule = require('../app/models/schedule')
const Event = require('../app/models/event')

const configDB       = require('../app/config/database')
mongoose.connect(configDB.localAddress)

function toTimeStamp(event) {
    let day = event['Thứ']
    let date = ''
    switch (day) {
        case '2':
            date = '01-May-2017 '
            break
        case '3':
            date = '02-May-2017 '
            break
        case '4':
            date = '03-May-2017 '
            break
        case '5':
            date = '04-May-2017 '
            break
        case '6':
            date = '05-May-2017 '
            break
        case '7':
            date = '06-May-2017 '
            break
        default:
            date = '08-May-2017 '
            break
    }
    let start, end
    if (Number(event['Tiết'].charAt(0)) < 6)
        start = Number(event['Tiết'].charAt(0)) + 6
    else
        start = Number(event['Tiết'].charAt(0)) + 7
    if (Number(event['Tiết'].substring(2)) < 6)
        end = Number(event['Tiết'].substring(2)) + 6
    else
        end = Number(event['Tiết'].substring(2)) + 7

    return {
        begin: Date.parse(date + start.toString() + ':00:00'),
        end: Date.parse(date + end.toString() + ':00:00'),
    }
}

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
        e.repeat = [event.module['Thứ']]
        e.endRepeat = Date.parse('31-May-2017 23:59:59')
        e.other = Object.assign({}, event.info, event.module)
        e.info = undefined
        e.module = undefined
        e.save((err, done)=> {
            console.log('done')
        })
    })
})