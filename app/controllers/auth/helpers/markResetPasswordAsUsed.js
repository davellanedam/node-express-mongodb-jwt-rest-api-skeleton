const utils = require('../../../middleware/utils')

/**
 * Marks a request to reset password as used
 * @param {Object} req - request object
 * @param {Object} forgot - forgot object
 */
const markResetPasswordAsUsed = (req, forgot) => {
  return new Promise((resolve) => {
    forgot.used = true
    forgot.ipChanged = utils.getIP(req)
    forgot.browserChanged = utils.getBrowserInfo(req)
    forgot.countryChanged = utils.getCountry(req)
    forgot.save((err, item) => {
      utils.itemNotFound(err, item, 'NOT_FOUND')
      resolve(utils.buildSuccObject('PASSWORD_CHANGED'))
    })
  })
}

module.exports = { markResetPasswordAsUsed }
