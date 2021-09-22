const express = require('express')
const router = express.Router()

const signInController = require('../app/controllers/SignInController')

router.post('/submit', signInController.submitSignIn)
router.get('/', signInController.signIn)

module.exports = router