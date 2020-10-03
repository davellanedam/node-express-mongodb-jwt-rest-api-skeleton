const { blockIsExpired } = require('./blockIsExpired')
const { buildErrObject } = require('../../../middleware/utils')

/**
 *
 * @param {Object} user - user object.
 */
const checkLoginAttemptsAndBlockExpires = (user = {}) => {
  return new Promise((resolve, reject) => {
    // Let user try to login again after blockexpires, resets user loginAttempts
    if (blockIsExpired(user)) {
      user.loginAttempts = 0
      user.save((err, result) => {
        if (err) {
          return reject(buildErrObject(422, err.message))
        }
        if (result) {
          return resolve(true)
        }
      })
    }
    // User is not blocked, check password (normal behaviour)
    resolve(true)
  })
}

module.exports = { checkLoginAttemptsAndBlockExpires }
