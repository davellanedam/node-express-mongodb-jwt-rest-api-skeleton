const User = require('../../../models/user')
const { itemNotFound } = require('../../../middleware/utils')

/**
 * Finds user by id
 * @param {string} email - user id
 */
const findUser = (id) => {
  return new Promise((resolve) => {
    User.findById(id, 'password email', (err, user) => {
      itemNotFound(err, user, 'USER_DOES_NOT_EXIST')
      resolve(user)
    })
  })
}

module.exports = { findUser }
