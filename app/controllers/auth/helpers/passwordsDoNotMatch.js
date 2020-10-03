const { saveLoginAttemptsToDB } = require('./saveLoginAttemptsToDB')
const { blockUser } = require('./blockUser')
const { buildErrObject } = require('../../../middleware/utils')
const LOGIN_ATTEMPTS = 5

/**
 * Adds one attempt to loginAttempts, then compares loginAttempts with the constant LOGIN_ATTEMPTS, if is less returns wrong password, else returns blockUser function
 * @param {Object} user - user object
 */
const passwordsDoNotMatch = async (user = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      user.loginAttempts += 1
      await saveLoginAttemptsToDB(user)
      if (user.loginAttempts <= LOGIN_ATTEMPTS) {
        return reject(buildErrObject(409, 'WRONG_PASSWORD'))
      }

      resolve(await blockUser(user))
    } catch (error) {
      throw error
    }
  })
}

module.exports = { passwordsDoNotMatch }
