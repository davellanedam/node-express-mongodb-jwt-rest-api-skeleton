const { addHours } = require('date-fns')
const HOURS_TO_BLOCK = 2

const { buildErrObject } = require('../../../middleware/utils')

/**
 * Blocks a user by setting blockExpires to the specified date based on constant HOURS_TO_BLOCK
 * @param {Object} user - user object
 */
const blockUser = (user = {}) => {
  return new Promise((resolve, reject) => {
    user.blockExpires = addHours(new Date(), HOURS_TO_BLOCK)
    user.save((err, result) => {
      if (err) {
        return reject(buildErrObject(422, err.message))
      }
      if (result) {
        return resolve(buildErrObject(409, 'BLOCKED_USER'))
      }
    })
  })
}

module.exports = { blockUser }
