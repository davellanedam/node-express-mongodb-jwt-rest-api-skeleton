const User = require('../../models/user')
const { itemAlreadyExists } = require('../../middleware/utils')

/**
 * Checks User model if user with an specific email exists but excluding user id
 * @param {string} id - user id
 * @param {string} email - user email
 */
const emailExistsExcludingMyself = (id, email) => {
  return new Promise((resolve) => {
    User.findOne(
      {
        email,
        _id: {
          $ne: id
        }
      },
      (err, item) => {
        itemAlreadyExists(err, item, 'EMAIL_ALREADY_EXISTS')
        resolve(false)
      }
    )
  })
}

module.exports = { emailExistsExcludingMyself }
