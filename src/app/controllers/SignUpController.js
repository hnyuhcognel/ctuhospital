const md5 = require('md5')
const Account = require('../models/Account')
const { Schema } = require('mongoose')
const { render } = require('sass')
class SignUpController {
  signUp (req, res) {
    res.render('sign-up')
  }

  submitSignUp (req, res, next) {
    Account.findOne({username: req.body.username})
    .then(account => {
      console.log(account.username)
      res.render('sign-up', {
        errors : ['Tài khoản đã tồn tại']})
      })
      .catch(() => {
        req.body.password = md5(req.body.password)
        const account = new Account(req.body)
        account.save()
          .then(() => res.redirect('/dang-nhap'))
          .catch(next)
        })
    
  }
}

module.exports = new SignUpController