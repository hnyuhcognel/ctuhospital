const express = require('express')
const router = express.Router()
const requireSignInMiddleware = require('../app/middlewares/sign-in')

const searchController = require('../app/controllers/SearchController')

router.get('/khong-tim-thay', requireSignInMiddleware.requireSignIn, searchController.searchNotFound)
router.get('/trang-chu', requireSignInMiddleware.requireSignIn, searchController.searchMain)
router.get('/', requireSignInMiddleware.requireSignIn, searchController.search)

module.exports = router