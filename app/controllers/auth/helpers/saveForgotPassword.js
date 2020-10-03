const uuid = require('uuid')
const ForgotPassword = require('../../../models/forgotPassword')
const utils = require('../../../middleware/utils')

/**
 * Creates a new password forgot
 * @param {Object} req - request object
 */
const saveForgotPassword = (req) => {
  return new Promise((resolve, reject) => {
    const forgot = new ForgotPassword({
      email: req.body.email,
      verification: uuid.v4(),
      ipRequest: utils.getIP(req),
      browserRequest: utils.getBrowserInfo(req),
      countryRequest: utils.getCountry(req)
    })
    forgot.save((err, item) => {
      if (err) {
        reject(utils.buildErrObject(422, err.message))
      }
      resolve(item)
    })
  })
}

module.exports = { saveForgotPassword }
