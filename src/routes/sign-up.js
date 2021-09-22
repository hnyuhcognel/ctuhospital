const express = require('express')
const router = express.Router()

const signUpController = require('../app/controllers/SignUpController')


router.post('/submit', signUpController.submitSignUp)
router.get('/', signUpController.signUp)

module.exports = router