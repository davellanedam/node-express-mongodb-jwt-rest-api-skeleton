/**
 * Builds an object with created forgot password object, if env is development or testing exposes the verification
 * @param {Object} item - created forgot password object
 */
const forgotPasswordResponse = ({ email = '', verification = '' }) => {
  let data = {
    msg: 'RESET_EMAIL_SENT',
    email
  }
  if (process.env.NODE_ENV !== 'production') {
    data = {
      ...data,
      verification
    }
  }
  return data
}

module.exports = { forgotPasswordResponse }
