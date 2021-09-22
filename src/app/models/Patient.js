const mongoose = require('mongoose')
const Schema = mongoose.Schema
const AutoIncrement = require('mongoose-sequence')(mongoose)

const Patient = new Schema({
  patient_id: Number,
  ['first-name']: String,
  ['last-name']: String,
  gender: String,
  ['blood-group']: String,
  ['date-of-birth']: Date,
  ['place-of-birth']: String,
  ['insurance-number']: Number,
  ['phone-number']: String,
  email: String,
  address: String,
  city: String,
  province: String,
  village: String,
  avatar:
    {
        type: String,
        default: 'default-avatar.png',
    }
})
Patient.plugin(AutoIncrement, {inc_field: 'patient_id', start_seq: 10000});

module.exports = mongoose.model('Patient', Patient)