const controller = require('../controllers/auth')
const validate = require('../controllers/auth.validate')
const express = require('express')
const router = express.Router()
const trimRequest = require('trim-request')

/*
 ROUTES
*/
router.post(
  '/register',
  trimRequest.all,
  validate.register,
  controller.register
)
router.post('/verify', trimRequest.all, validate.verify, controller.verify)
router.post(
  '/forgot',
  trimRequest.all,
  validate.forgotPassword,
  controller.forgotPassword
)
router.post(
  '/reset',
  trimRequest.all,
  validate.resetPassword,
  controller.resetPassword
)
router.post('/login', trimRequest.all, validate.login, controller.login)

module.exports = router
