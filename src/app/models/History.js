const mongoose = require('mongoose')
const Schema = mongoose.Schema
const AutoIncrement = require('mongoose-sequence')(mongoose)

const   History = new Schema({
  history_id: Number,
  patient_id: Number,
  date: Date,
  doctor: String,
  disease: String,
}, { collection: 'medical_history' })
History.plugin(AutoIncrement, {inc_field: 'history_id', start_seq: 1});

module.exports = mongoose.model('History', History)