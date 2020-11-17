const LOGIN_ATTEMPTS_LIMIT = 5

/**
 * Generate error message when user tries to login.
 * @param {Number} loginAttempts user's login attempts
 */
const generatePasswordErrorMsg = (loginAttempts = 0) =>
  parseInt(LOGIN_ATTEMPTS_LIMIT - loginAttempts, 10) > 0
    ? `WRONG_PASSWORD_${parseInt(
        LOGIN_ATTEMPTS_LIMIT - loginAttempts,
        10
      )}_ATTEMPTS_LEFT`
    : 'BLOCKED_USER'

module.exports = {
  generatePasswordErrorMsg
}
