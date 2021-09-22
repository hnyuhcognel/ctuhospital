
class SignInController {
  signOut(req, res) {
    res.clearCookie('username')
    res.redirect('/dang-nhap')
  }
}

module.exports = new SignInController