const express = require('express')
const router = express.Router()
const MedicalHistoryController = require('../app/controllers/MedicalHistoryController')
const requireSignInMiddleware = require('../app/middlewares/sign-in')



router.get('/:patient_id/them', requireSignInMiddleware.requireSignIn, MedicalHistoryController.newMedicalHistory)
router.get('/:patient_id/:history_id/chinh-sua', requireSignInMiddleware.requireSignIn, MedicalHistoryController.updateMedicalHistory)
router.put('/:patient_id/:history_id', requireSignInMiddleware.requireSignIn, MedicalHistoryController.submitUpdateMedicalHistory)
router.delete('/:history_id', requireSignInMiddleware.requireSignIn, MedicalHistoryController.deleteMedicalHistory)
router.post('/:patient_id/luu', requireSignInMiddleware.requireSignIn, MedicalHistoryController.storeNewMedicalHistory)
router.get('/', requireSignInMiddleware.requireSignIn, MedicalHistoryController.medicalHistory)

module.exports = router