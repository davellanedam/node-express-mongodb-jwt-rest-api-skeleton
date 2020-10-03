const ForgotPassword = require('../../../models/forgotPassword')
const { itemNotFound } = require('../../../middleware/utils')

/**
 * Checks if a forgot password verification exists
 * @param {string} id - verification id
 */
const findForgotPassword = (id = '') => {
  return new Promise((resolve) => {
    ForgotPassword.findOne(
      {
        verification: id,
        used: false
      },
      (err, item) => {
        itemNotFound(err, item, 'NOT_FOUND_OR_ALREADY_USED')
        resolve(item)
      }
    )
  })
}

module.exports = { findForgotPassword }
