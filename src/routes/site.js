const express = require('express')
const router = express.Router()
const requireSignInMiddleware = require('../app/middlewares/sign-in')


const SiteController = require('../app/controllers/SiteController')

router.get('/', requireSignInMiddleware.requireSignIn, SiteController.index)

module.exports = router