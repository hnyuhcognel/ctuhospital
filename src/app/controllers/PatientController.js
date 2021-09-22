const Address = require('../models/Address')
const Patient = require('../models/Patient')
const { multipleMongooseToObject, mongooseToObject } = require('../../util/mongoose')
const { Schema } = require('mongoose')
const { render } = require('sass')


class PatientController {
  patientList(req, res, next) {
    Patient.find({})
      .then(patients => {
        res.render('patient-list', {
          patients: multipleMongooseToObject(patients)
        })
      })
      .catch(next)
  }

  newPatient(req, res, next) {
    Address.find({})
      .then(addresses => {
        res.render('new-patient', {
          addresses: multipleMongooseToObject(addresses)
        })
      })
      .catch(next)
  }

  storeNewPatient(req, res, next) {
    if (req.file === undefined) req.body.avatar = undefined
    else req.body.avatar = req.file.filename
    const patient = new Patient(req.body)
    patient.save()
      .then(() => res.redirect('/benh-nhan'))
      .catch(next)
  }

  updatePatient(req, res, next) {
    Patient.findOne({ patient_id: req.params.patient_id })
      .then(patient => {
        Address.find({})
          .then(addresses => {
            res.render('update-patient', {
              addresses: multipleMongooseToObject(addresses),
              patient: mongooseToObject(patient)

            })
          })
      })
      .catch(next)
  }

  submitUpdatePatient(req, res, next) {
    if (req.file === undefined) req.body.avatar = 'default-avatar.png'
    else req.body.avatar = req.file.filename
    Patient.updateOne({ patient_id: req.params.patient_id }, req.body)
      .then(patient => res.redirect(`/tim-kiem?search=${req.params.patient_id}`))
      .catch(next)
  }

  deletePatient(req, res, next) {
    Patient.deleteOne({ patient_id: req.params.patient_id })
      .then(() => res.redirect('back'))
      .catch(next)
  }
}

module.exports = new PatientController