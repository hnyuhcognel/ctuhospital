const express = require('express')
const router = express.Router()
const requireSignInMiddleware = require('../app/middlewares/sign-in')


const RegisterController = require('../app/controllers/RegisterController')

router.get('/danh-sach', requireSignInMiddleware.requireSignIn, RegisterController.registerList)
router.post('/luu', requireSignInMiddleware.requireSignIn, RegisterController.storeRegister)
router.get('/:register_id/chinh-sua', requireSignInMiddleware.requireSignIn, RegisterController.updateRegister)
router.put('/:register_id', requireSignInMiddleware.requireSignIn, RegisterController.submitUpdateRegister)
router.delete('/:register_id', requireSignInMiddleware.requireSignIn, RegisterController.deleteRegister)
router.get('/', requireSignInMiddleware.requireSignIn, RegisterController.register)

module.exports = router