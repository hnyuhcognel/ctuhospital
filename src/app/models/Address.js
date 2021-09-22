const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Address = new Schema({
  id: String,
  code: String,
  name: String,
  districts: Array,
})

module.exports = mongoose.model('Address', Address)