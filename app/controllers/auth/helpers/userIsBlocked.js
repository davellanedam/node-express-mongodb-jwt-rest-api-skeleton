const { buildErrObject } = require('../../../middleware/utils')

/**
 * Checks if blockExpires from user is greater than now
 * @param {Object} user - user object
 */
const userIsBlocked = (user = {}) => {
  return new Promise((resolve, reject) => {
    if (user.blockExpires > new Date()) {
      return reject(buildErrObject(409, 'BLOCKED_USER'))
    }
    resolve(true)
  })
}

module.exports = { userIsBlocked }
