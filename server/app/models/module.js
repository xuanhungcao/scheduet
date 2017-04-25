const mongoose = require('mongoose')

const moduleSchema = mongoose.Schema({
  'Mã học phần' : String,
  'Học Phần' : String,
  'TC': Number,
  'Mã LHP': String,
  'SS DK' : Number,
  'Giảng viên': String,
  'Buổi': String,
  'Thứ' : Number,
  'Tiết': String,
  'Giảng đường': String,
  'Ghi chú': String,
})

module.exports = mongoose.model('modules', moduleSchema)
