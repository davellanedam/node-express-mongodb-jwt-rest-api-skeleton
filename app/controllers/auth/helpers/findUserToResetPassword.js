const User = require('../../../models/user')
const { itemNotFound } = require('../../../middleware/utils')

/**
 * Finds user by email to reset password
 * @param {string} email - user email
 */
const findUserToResetPassword = (email = '') => {
  return new Promise((resolve) => {
    User.findOne(
      {
        email
      },
      (err, user) => {
        itemNotFound(err, user, 'NOT_FOUND')
        resolve(user)
      }
    )
  })
}

module.exports = { findUserToResetPassword }
