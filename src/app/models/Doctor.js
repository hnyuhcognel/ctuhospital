const mongoose = require('mongoose')
const Schema = mongoose.Schema
const AutoIncrement = require('mongoose-sequence')(mongoose)

const Doctor = new Schema({
  doctor_id: Number,
  ['first-name']: String,
  ['last-name']: String,
  faculty: String,
})
Doctor.plugin(AutoIncrement, {inc_field: 'doctor_id', start_seq: 100});

module.exports = mongoose.model('Doctor', Doctor)