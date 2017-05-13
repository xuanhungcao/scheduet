
const csv = require('csv')
const fs = require('fs')
const request = require('request')
const cheerio = require('cheerio')
const mongoose = require('mongoose')
const Schedule = require('../app/models/schedule')

const Module = require('../app/models/module')
let files = ['K58K2.csv', 'K59K2.csv', 'K60K2.csv', 'K61K2.csv', 'K61XHHK2.csv']


let cnt = 0

const configDB       = require('../app/config/database')
mongoose.connect(configDB.localAddress)

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"

function parse(mssv) {
  let url = `https://112.137.129.87/congdaotao/module/qldt/?SinhvienLmh%5BmasvTitle%5D=${mssv}&SinhvienLmh%5BhotenTitle%5D=&SinhvienLmh%5BngaysinhTitle%5D=&SinhvienLmh%5BlopkhoahocTitle%5D=&SinhvienLmh%5BtenlopmonhocTitle%5D=&SinhvienLmh%5BtenmonhocTitle%5D=&SinhvienLmh%5Bnhom%5D=&SinhvienLmh%5BsotinchiTitle%5D=&SinhvienLmh%5Bghichu%5D=&SinhvienLmh%5Bterm_id%5D=021&SinhvienLmh_page=1&ajax=sinhvien-lmh-grid`
  request(url, (err, response, data) => {
    if (err) throw err
    let $ = cheerio.load(data)

    let raw = []
    $('tbody tr td').each((index, element) => {
      let css = $(element).css()
      if (!css.display)
        raw.push($(element).text())
    })
    for (let i = 0; i < raw.length; i+= 10) {
      let schedule = {
        'mssv': raw[i + 1],
        'Họ và tên': raw[i + 2],
        'Ngày sinh': raw[i + 3],
        'Lớp khóa học': raw[i + 4],
        'Mã LMH': raw[i + 5],
        'Tên môn học': raw[i + 6],
        'Nhóm': raw[i + 7],
        'Số TC': raw[i + 8],
        'Ghi chú': raw[i + 9],
      }
      console.log(mssv)
      fs.appendFileSync('sv-mh', JSON.stringify(schedule) + '\n')
    }
  })
}



files.forEach(file => {
  fs.readFile(`data/${file}`, 'utf8', (err, data) => {
    if (err) throw err
    csv.parse(data, (err, data) => {
      data.forEach(e => {
        mssv = e[1]
        if (mssv.length != 8) return
        parse(mssv)
      })
    })
  })
})


let cnt = 0
fs.readFile('data.txt', (err, dat) => {
  let schedule = new Schedule()
  let data = JSON.parse(dat)

  data.forEach(e => {
    let schedule = new Schedule()
    schedule.info = e
    schedule.save(((err,done) => {
      console.log(`done ${cnt++}`)
    }))
  })
})

fs.readFile('final.csv', (err, data) => {
  if (err) throw err
  csv.parse(data, (err, data) => {
   data.forEach(e => {
     let mod = new Module()
     mod['Mã học phần'] = e[0]
     mod['Học Phần'] = e[1]
     mod['TC']= e[2]
     mod['Mã LHP']= e[3]
     mod['SS DK'] = e[4]
     mod['Giảng viên']= e[5]
     mod['Buổi']= e[6]
     mod['Thứ'] = e[7]
     mod['Tiết']= e[8],
     mod['Giảng đường']= e[9]
     mod['Ghi chú']= e[10]
     mod.save((err, done) => {
       console.log('done')
     })
   })
  })
})
*/
