const Patient = require('../models/Patient')
const History = require('../models/History')
const { mongooseToObject, multipleMongooseToObject } = require('../../util/mongoose')
const { Schema } = require('mongoose')

class SearchController {

  searchMain(req, res, next) {
    res.render('search-main')
  }

  search(req, res, next) {
    // Patient.findOne({ ['patient_id']: req.query.search})
    //   .then(patient => {
    //     if (!patient) res.redirect('/tim-kiem/khong-tim-thay')
    //     else res.render('search', {patient: mongooseToObject(patient)})
    //   })
    //   // .then(() => res.redirect('/tim-kiem/khong-tim-thay'))
    //   .catch(next)

    History.find({patient_id: req.query.search})
      .then(history => {
        Patient.findOne({ patient_id: req.query.search })
          .then(patient => {
            if (!patient) res.redirect('/tim-kiem/khong-tim-thay')
            else {
              res.render('search', {
                history: multipleMongooseToObject(history),
                patient: mongooseToObject(patient)
              })
            }
          })
      })
      .catch(next)

  }
  searchNotFound(req, res) {
    res.render('search-not-found')
  }
}

module.exports = new SearchController