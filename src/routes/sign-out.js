const express = require('express')
const router = express.Router()

const signOutController = require('../app/controllers/SignOutController')

router.get('/', signOutController.signOut)

module.exports = router