const User = require('../../../models/user')
const { itemNotFound } = require('../../../middleware/utils')
const { reject } = require('bcrypt/promises')

/**
 * Finds user by email
 * @param {string} email - user´s email
 */
const findUser = (email = '') => {
  return new Promise((resolve) => {
    User.findOne(
      {
        email
      },
      'password loginAttempts blockExpires name email role verified verification',
      async (err, item) => {
        try {
          await itemNotFound(err, item, 'USER_DOES_NOT_EXIST')
          resolve(item)
        } catch (error) {
          reject(error)
        }
      }
    )
  })
}

module.exports = { findUser }
