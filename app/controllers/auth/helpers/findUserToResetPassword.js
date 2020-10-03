const User = require('../../../models/user')
const utils = require('../../../middleware/utils')

/**
 * Finds user by email to reset password
 * @param {string} email - user email
 */
const findUserToResetPassword = (email) => {
  return new Promise((resolve, reject) => {
    User.findOne(
      {
        email
      },
      (err, user) => {
        utils.itemNotFound(err, user, reject, 'NOT_FOUND')
        resolve(user)
      }
    )
  })
}

module.exports = { findUserToResetPassword }
