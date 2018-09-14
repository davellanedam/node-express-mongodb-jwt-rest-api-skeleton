const {
  handleError,
  buildErrObject
} = require('./base')
const validator = require('validator')
const {
  check,
  validationResult
} = require('express-validator/check')

exports.updateProfile = [
  check('name')
  .exists()
  .withMessage('MISSING')
  .not()
  .isEmpty()
  .withMessage('IS_EMPTY'),
  check('headline')
  .optional()
  .isLength({
    max: 140
  })
  .withMessage('STRING_TOO_LONG_MAX_140'),
  check('urlTwitter')
  .optional()
  .custom((v) => (v === '' ? true : validator.isURL(v)))
  .withMessage('NOT_A_VALID_URL'),
  check('urlGitHub')
  .optional()
  .custom((v) => (v === '' ? true : validator.isURL(v)))
  .withMessage('NOT_A_VALID_URL'),
  (req, res, next) => {
    try {
      validationResult(req).throw()
      return next()
    } catch (err) {
      return handleError(res, buildErrObject(422, err.array()))
    }
  }
]
