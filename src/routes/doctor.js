const express = require('express')
const router = express.Router()
const DoctorController = require('../app/controllers/DoctorController')
const requireSignInMiddleware = require('../app/middlewares/sign-in')



router.get('/them', requireSignInMiddleware.requireSignIn, DoctorController.newDoctor)
router.get('/:doctor_id/chinh-sua', requireSignInMiddleware.requireSignIn, DoctorController.updateDoctor)
router.put('/:doctor_id', requireSignInMiddleware.requireSignIn, DoctorController.submitUpdateDoctor)
router.delete('/:doctor_id', requireSignInMiddleware.requireSignIn, DoctorController.deleteDoctor)
router.post('/luu', requireSignInMiddleware.requireSignIn, DoctorController.storeNewDoctor)
router.get('/', requireSignInMiddleware.requireSignIn, DoctorController.doctorList)

module.exports = router