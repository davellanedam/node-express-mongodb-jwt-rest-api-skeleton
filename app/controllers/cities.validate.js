const base = require('./base')
const {
  check,
  validationResult
} = require('express-validator/check')

exports.createItem = [
  check('name')
  .exists()
  .withMessage('MISSING')
  .not()
  .isEmpty()
  .withMessage('IS_EMPTY')
  .trim(),
  (req, res, next) => {
    try {
      validationResult(req).throw()
      return next()
    } catch (err) {
      return base.handleError(res, base.buildErrObject(422, err.array()))
    }
  }
]

exports.updateItem = [
  check('name')
  .exists()
  .withMessage('MISSING')
  .not()
  .isEmpty()
  .withMessage('IS_EMPTY'),
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
      return base.handleError(res, base.buildErrObject(422, err.array()))
    }
  }
]

exports.getItem = [
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
      return base.handleError(res, base.buildErrObject(422, err.array()))
    }
  }
]

exports.deleteItem = [
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
      return base.handleError(res, base.buildErrObject(422, err.array()))
    }
  }
]
