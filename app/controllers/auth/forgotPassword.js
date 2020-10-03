const { matchedData } = require('express-validator')
const {
  findUser,
  forgotPasswordResponse,
  saveForgotPassword
} = require('./helpers')
const utils = require('../../middleware/utils')
const emailer = require('../../middleware/emailer')

/**
 * Forgot password function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const forgotPassword = async (req, res) => {
  try {
    // Gets locale from header 'Accept-Language'
    const locale = req.getLocale()
    const data = matchedData(req)
    await findUser(data.email)
    const item = await saveForgotPassword(req)
    emailer.sendResetPasswordEmailMessage(locale, item)
    res.status(200).json(forgotPasswordResponse(item))
  } catch (error) {
    utils.handleError(res, error)
  }
}

module.exports = { forgotPassword }
