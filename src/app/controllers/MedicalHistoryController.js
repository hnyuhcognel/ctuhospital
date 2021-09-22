const History = require('../models/History')
const Patient = require('../models/Patient')
const Doctor = require('../models/Doctor')
const { multipleMongooseToObject, mongooseToObject } = require('../../util/mongoose')
const { Schema } = require('mongoose')
const { render } = require('sass')


class MedicalHistoryController {
  medicalHistory(req, res, next) {
    res.render('search-not-found')
  }

  newMedicalHistory(req, res, next) {
    Doctor.find({})
      .then(doctors => {
        res.render('new-history', {
          doctors: multipleMongooseToObject(doctors),
          patient_id: req.params.patient_id
        })
      })
      .catch(next)
  }

  storeNewMedicalHistory(req, res, next) {
    req.body.patient_id = req.params.patient_id
    const history = new History(req.body)
    history.save()
      .then(() => res.redirect(`/tim-kiem/?search=${req.params.patient_id}`))
      .catch(next)
  }

  updateMedicalHistory(req, res, next) {
    History.findOne({ history_id: req.params.history_id })
      .then(history => {
        Doctor.find({})
          .then(doctors => {
            res.render('update-history', {
              doctors: multipleMongooseToObject(doctors),
              history: mongooseToObject(history)
            })
          })
      })
      .catch(next)
  }

  submitUpdateMedicalHistory(req, res, next) {
    History.updateOne({ history_id: req.params.history_id }, req.body)
      .then(history => res.redirect(`/tim-kiem?search=${req.params.patient_id}`))
      .catch(next)
  }

  deleteMedicalHistory(req, res, next) {
    History.deleteOne({ history_id: req.params.history_id })
      .then(() => res.redirect('back'))
      .catch(next)
  }
}

module.exports = new MedicalHistoryController