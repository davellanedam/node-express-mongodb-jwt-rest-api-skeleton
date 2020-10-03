const User = require('../../models/user')
const { itemAlreadyExists } = require('../../middleware/utils')

/**
 * Checks User model if user with an specific email exists
 * @param {string} email - user email
 */
const emailExists = (email) => {
  return new Promise((resolve) => {
    User.findOne(
      {
        email
      },
      (err, item) => {
        itemAlreadyExists(err, item, 'EMAIL_ALREADY_EXISTS')
        resolve(false)
      }
    )
  })
}

module.exports = { emailExists }
