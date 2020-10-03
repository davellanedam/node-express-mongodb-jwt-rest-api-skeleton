const LOGIN_ATTEMPTS = 5

/**
 * Checks that login attempts are greater than specified in constant and also that blockexpires is less than now
 * @param {Object} user - user object
 */
const blockIsExpired = ({ loginAttempts = 0, blockExpires = '' }) =>
  loginAttempts > LOGIN_ATTEMPTS && blockExpires <= new Date()

module.exports = { blockIsExpired }
