const User = require('../../../models/user')
const { itemNotFound } = require('../../../middleware/utils')

/**
 * Checks if verification id exists for user
 * @param {string} id - verification id
 */
const verificationExists = (id = '') => {
  return new Promise((resolve, reject) => {
    User.findOne(
      {
        verification: id,
        verified: false
      },
      async (err, user) => {
        try {
          await itemNotFound(err, user, 'NOT_FOUND_OR_ALREADY_VERIFIED')
          resolve(user)
        } catch (error) {
          reject(error)
        }
      }
    )
  })
}

module.exports = { verificationExists }
