const md5 = require('md5')
const Account = require('../models/Account')
const { mongooseToObject } = require('../../util/mongoose')
const { Schema } = require('mongoose')
const { render } = require('sass')
class SignInController {
  signIn(req, res) {
    res.render('sign-in')
  }

  submitSignIn(req, res) {
    var hashedPassword = md5(req.body.password)
    Account.findOne({ username: req.body.username, password: hashedPassword })
      .then(account => {
        res.cookie('username', account.username)
        res.redirect('/tim-kiem/trang-chu')
      })
      .catch(() => {
        res.render('sign-in', {
          errors : ['Tài khoản hoặc mật khẩu không đúng']})
      })
  }
}

module.exports = new SignInController