const User = require('../../../models/user')
const { itemNotFound } = require('../../../middleware/utils')
const { reject } = require('bcrypt/promises')

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
      async (err, user) => {
        try {
          await itemNotFound(err, user, 'NOT_FOUND')
          resolve(user)
        } catch (error) {
          reject(error)
        }
      }
    )
  })
}

module.exports = { findUserToResetPassword }
