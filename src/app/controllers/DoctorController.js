const Doctor = require('../models/Doctor')
const { multipleMongooseToObject, mongooseToObject } = require('../../util/mongoose')
const { Schema } = require('mongoose')
const { render } = require('sass')


class DoctorController {
  doctorList(req, res, next) {
    Doctor.find({})
      .then(doctors => {
        res.render('doctor-list', {
          doctors: multipleMongooseToObject(doctors)
        })
      })
      .catch(next)
  }

  newDoctor(req, res, next) {
    Doctor.find({})
      .then(doctor => {
        res.render('new-doctor', {
          doctor: multipleMongooseToObject(doctor)
        })
      })
      .catch(next)
  }

  storeNewDoctor(req, res, next) {
    const doctor = new Doctor(req.body)
    doctor.save()
      .then(() => res.redirect('/bac-si'))
      .catch(next)
  }

  updateDoctor(req, res, next) {
    Doctor.findOne({ doctor_id: req.params.doctor_id })
      .then(doctor => {
        res.render('update-doctor', {
          doctor: mongooseToObject(doctor)
        })
      })
      .catch(next)
  }

  submitUpdateDoctor(req, res, next) {
    Doctor.updateOne({ doctor_id: req.params.doctor_id }, req.body)
      .then(doctor => res.redirect("/bac-si"))
      .catch(next)
  }

  deleteDoctor(req, res, next) {
    Doctor.deleteOne({ doctor_id: req.params.doctor_id })
      .then(() => res.redirect('back'))
      .catch(next)
  }
}

module.exports = new DoctorController