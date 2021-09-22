const express = require('express')
const PatientController = require('../app/controllers/PatientController')
const router = express.Router()
const requireSignInMiddleware = require('../app/middlewares/sign-in')

const multer  = require('multer')
// var upload = multer({ dest: 'E:/ĐHCT/Nien luan CS/Interface/src/public/uploads/'})
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'E:/ĐHCT/Nien_luan_CS/Interface/src/public/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '.jpg')
  }
})

var upload = multer({ storage: storage });


router.get('/them', requireSignInMiddleware.requireSignIn, PatientController.newPatient)
router.get('/:patient_id/chinh-sua', requireSignInMiddleware.requireSignIn, PatientController.updatePatient)
router.put('/:patient_id', requireSignInMiddleware.requireSignIn, upload.single('avatar'), PatientController.submitUpdatePatient)
router.delete('/:patient_id', requireSignInMiddleware.requireSignIn, PatientController.deletePatient)
router.post('/luu', requireSignInMiddleware.requireSignIn, upload.single('avatar'), PatientController.storeNewPatient)
router.get('/', requireSignInMiddleware.requireSignIn, PatientController.patientList)

module.exports = router