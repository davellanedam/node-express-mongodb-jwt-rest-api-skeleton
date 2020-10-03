const User = require('../../../models/user')
const { itemNotFound } = require('../../../middleware/utils')
const { reject } = require('bcrypt/promises')

/**
 * Finds user by id
 * @param {string} id - user id
 */
const findUser = (id = '') => {
  return new Promise((resolve) => {
    User.findById(id, 'password email', async (err, user) => {
      try {
        await itemNotFound(err, user, 'USER_DOES_NOT_EXIST')
        resolve(user)
      } catch (error) {
        reject(error)
      }
    })
  })
}

module.exports = { findUser }
