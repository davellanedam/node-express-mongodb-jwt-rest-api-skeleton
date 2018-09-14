const {
  handleError,
  buildErrObject
} = require('./base')
const {
  check,
  validationResult
} = require('express-validator/check')

exports.register = [
  check('name')
  .exists()
  .withMessage('MISSING')
  .not()
  .isEmpty()
  .withMessage('IS_EMPTY'),
  check('email')
  .exists()
  .withMessage('MISSING')
  .not()
  .isEmpty()
  .withMessage('IS_EMPTY')
  .normalizeEmail(),
  check('password')
  .exists()
  .withMessage('MISSING')
  .not()
  .isEmpty()
  .withMessage('IS_EMPTY')
  .isLength({
    min: 5
  })
  .withMessage('PASSWORD_TOO_SHORT_MIN_5'),
  (req, res, next) => {
    try {
      validationResult(req).throw()
      return next()
    } catch (err) {
      return handleError(res, buildErrObject(422, err.array()))
    }
  }
]

exports.login = [
  check('email')
  .exists()
  .withMessage('MISSING')
  .not()
  .isEmpty()
  .withMessage('IS_EMPTY')
  .isEmail()
  .withMessage('EMAIL_IS_NOT_VALID')
  .normalizeEmail(),
  check('password')
  .exists()
  .withMessage('MISSING')
  .not()
  .isEmpty()
  .withMessage('IS_EMPTY'),
  (req, res, next) => {
    try {
      validationResult(req).throw()
      return next()
    } catch (err) {
      return handleError(res, buildErrObject(422, err.array()))
    }
  }
]

exports.verify = [
  check('id')
  .exists()
  .withMessage('MISSING')
  .not()
  .isEmpty()
  .withMessage('IS_EMPTY'),
  (req, res, next) => {
    try {
      validationResult(req).throw()
      return next()
    } catch (err) {
      return handleError(res, buildErrObject(422, err.array()))
    }
  }
]

exports.forgotPassword = [
  check('email')
  .exists()
  .withMessage('MISSING')
  .not()
  .isEmpty()
  .withMessage('IS_EMPTY')
  .isEmail()
  .withMessage('EMAIL_IS_NOT_VALID')
  .normalizeEmail(),
  (req, res, next) => {
    try {
      validationResult(req).throw()
      return next()
    } catch (err) {
      return handleError(res, buildErrObject(422, err.array()))
    }
  }
]

exports.resetPassword = [
  check('id')
  .exists()
  .withMessage('MISSING')
  .not()
  .isEmpty()
  .withMessage('IS_EMPTY'),
  check('password')
  .exists()
  .withMessage('MISSING')
  .not()
  .isEmpty()
  .withMessage('IS_EMPTY')
  .isLength({
    min: 5
  })
  .withMessage('PASSWORD_TOO_SHORT_MIN_5'),
  (req, res, next) => {
    try {
      validationResult(req).throw()
      return next()
    } catch (err) {
      return handleError(res, buildErrObject(422, err.array()))
    }
  }
]
