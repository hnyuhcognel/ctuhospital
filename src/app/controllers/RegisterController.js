const Register = require('../models/Register')
const Address = require('../models/Address')
const { multipleMongooseToObject, mongooseToObject } = require('../../util/mongoose')
const { Schema } = require('mongoose')


class RegisterController {
  register(req, res, next) {
    res.render('index')
  }

  storeRegister(req, res, next) {
    const register = new Register(req.body)
    register.save()
      .then(() => res.redirect('/dang-ky-kham-benh/danh-sach'))
      .catch(next)
  }

  registerList(req, res, next) {
    Register.find({})
      .then(registers => {
        res.render('register-list', {
          registers: multipleMongooseToObject(registers)
        })
      })
      .catch(next)
  }

  updateRegister(req, res, next) {
    Register.findOne({register_id: req.params.register_id})
      .then(register => res.render('update-register', {
        register: mongooseToObject(register)
      }))
      .catch(next)
  }

  submitUpdateRegister(req, res, next) {
    Register.updateOne({ register_id: req.params.register_id }, req.body)
      .then(register => res.redirect('/dang-ky-kham-benh/danh-sach'))
      .catch(next)
  }

  deleteRegister(req, res, next) {
    Register.deleteOne({ register_id: req.params.register_id })
      .then(() => res.redirect('back'))
      .catch(next)
  }

}

module.exports = new RegisterController