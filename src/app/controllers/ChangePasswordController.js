const md5 = require('md5')
const Account = require('../models/Account')
const { Schema } = require('mongoose')
const { render } = require('sass')

class ChangePasswordController {
  changePassword(req, res) {
    res.render('change-password')
  }

  submitChangePassword(req, res, next) {
    req.body.old_password = md5(req.body.old_password)
    req.body.new_password = md5(req.body.new_password)
    Account.findOneAndUpdate({ username: req.cookies.username, password: req.body.old_password }, req.body)
      .then(account => {
        if (!account) return
        res.redirect('/tim-kiem/trang-chu')
      })
      .then(() => {
        res.render('change-password', {
          errors: ['Mật khẩu cũ không đúng']
        })
      })
      .catch(next)

  }
}

module.exports = new ChangePasswordController