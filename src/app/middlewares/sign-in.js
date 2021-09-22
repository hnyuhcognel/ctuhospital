const Account = require('../models/Account')

module.exports.requireSignIn = (req, res, next) => {
  if(!req.cookies.username) {
    res.redirect('/dang-nhap')
    return
  }

  Account.findOne({ username: req.cookies.username })
  .then(account => {
    next()
  })
  .catch(() => {
    res.redirect('/dang-nhap')
    return
  })
}