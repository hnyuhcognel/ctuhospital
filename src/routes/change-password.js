const express = require('express')
const router = express.Router()

const ChangePasswordController = require('../app/controllers/ChangePasswordController')


router.put('/submit', ChangePasswordController.submitChangePassword)
router.get('/', ChangePasswordController.changePassword)

module.exports = router