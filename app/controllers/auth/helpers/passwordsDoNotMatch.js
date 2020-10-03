const { saveLoginAttemptsToDB } = require('./saveLoginAttemptsToDB')
const { blockUser } = require('./blockUser')
const { buildErrObject } = require('../../../middleware/utils')
const LOGIN_ATTEMPTS = 5

/**
 * Adds one attempt to loginAttempts, then compares loginAttempts with the constant LOGIN_ATTEMPTS, if is less returns wrong password, else returns blockUser function
 * @param {Object} user - user object
 */
const passwordsDoNotMatch = async (user) => {
  user.loginAttempts += 1
  await saveLoginAttemptsToDB(user)
  return new Promise((resolve, reject) => {
    if (user.loginAttempts <= LOGIN_ATTEMPTS) {
      return resolve(buildErrObject(409, 'WRONG_PASSWORD'))
    } else {
      resolve(blockUser(user))
    }
    reject(buildErrObject(422, 'ERROR'))
  })
}

module.exports = { passwordsDoNotMatch }
