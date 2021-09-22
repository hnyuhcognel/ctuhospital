const signInRouter = require('./sign-in')
const changePasswordRouter = require('./change-password')
const signUpRouter = require('./sign-up')
const signOutRouter = require('./sign-out')
const patientRouter = require('./patient')
const siteRouter = require('./site')
const searchRouter = require('./search')
const registerRouter = require('./register')
const doctorRouter = require('./doctor')
const medicalHistoryRouter = require('./medical-history')

function route(app) {


  app.use('/dang-ky-kham-benh', registerRouter)
  app.use('/tim-kiem', searchRouter)
  app.use('/doi-mat-khau', changePasswordRouter)
  app.use('/dang-nhap', signInRouter)
  app.use('/dang-xuat', signOutRouter)
  app.use('/dang-ky', signUpRouter)
  app.use('/benh-nhan', patientRouter)
  app.use('/bac-si', doctorRouter)
  app.use('/lich-su-kham-benh', medicalHistoryRouter)
  app.use('/', siteRouter)
}

module.exports = route