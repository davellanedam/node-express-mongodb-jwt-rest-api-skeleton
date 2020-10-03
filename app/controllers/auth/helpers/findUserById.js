const User = require('../../../models/user')
const { itemNotFound } = require('../../../middleware/utils')

/**
 * Finds user by ID
 * @param {string} id - user´s id
 */
const findUserById = (userId = '') => {
  return new Promise((resolve, reject) => {
    User.findById(userId, async (err, item) => {
      try {
        await itemNotFound(err, item, 'USER_DOES_NOT_EXIST')
        resolve(item)
      } catch (error) {
        reject(error)
      }
    })
  })
}

module.exports = { findUserById }
