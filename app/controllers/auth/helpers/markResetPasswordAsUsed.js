const {
  getIP,
  getBrowserInfo,
  getCountry,
  itemNotFound,
  buildSuccObject
} = require('../../../middleware/utils')

/**
 * Marks a request to reset password as used
 * @param {Object} req - request object
 * @param {Object} forgot - forgot object
 */
const markResetPasswordAsUsed = (req = {}, forgot = {}) => {
  return new Promise((resolve) => {
    forgot.used = true
    forgot.ipChanged = getIP(req)
    forgot.browserChanged = getBrowserInfo(req)
    forgot.countryChanged = getCountry(req)
    forgot.save((err, item) => {
      itemNotFound(err, item, 'NOT_FOUND')
      resolve(buildSuccObject('PASSWORD_CHANGED'))
    })
  })
}

module.exports = { markResetPasswordAsUsed }
