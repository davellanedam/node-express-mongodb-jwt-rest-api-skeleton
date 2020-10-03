const User = require('../../../models/user')
const { itemNotFound } = require('../../../middleware/utils')

/**
 * Finds user by email
 * @param {string} email - user´s email
 */
const findUser = (email) => {
  return new Promise((resolve) => {
    User.findOne(
      {
        email
      },
      'password loginAttempts blockExpires name email role verified verification',
      (err, item) => {
        itemNotFound(err, item, 'USER_DOES_NOT_EXIST')
        resolve(item)
      }
    )
  })
}

module.exports = { findUser }
