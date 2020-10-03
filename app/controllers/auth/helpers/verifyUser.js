const utils = require('../../../middleware/utils')

/**
 * Verifies an user
 * @param {Object} user - user object
 */
const verifyUser = (user) => {
  return new Promise((resolve, reject) => {
    user.verified = true
    user.save((err, item) => {
      if (err) {
        reject(utils.buildErrObject(422, err.message))
      }
      resolve({
        email: item.email,
        verified: item.verified
      })
    })
  })
}

module.exports = { verifyUser }
