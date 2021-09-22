const mongoose = require('mongoose')
const Schema = mongoose.Schema
const AutoIncrement = require('mongoose-sequence')(mongoose)

const Register = new Schema({
  register_id: Number,
  ['first-name']: String,
  ['last-name']: String,
  ['phone-number']: String,
  ['date-of-examination']: Date,
})

Register.plugin(AutoIncrement, {inc_field: 'register_id', start_seq: 1});

module.exports = mongoose.model('Register', Register)