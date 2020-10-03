const { itemNotFound } = require('../../../middleware/utils')

/**
 * Updates a user password in database
 * @param {string} password - new password
 * @param {Object} user - user object
 */
const updatePassword = (password, user) => {
  return new Promise((resolve) => {
    user.password = password
    user.save((err, item) => {
      itemNotFound(err, item, 'NOT_FOUND')
      resolve(item)
    })
  })
}

module.exports = { updatePassword }
