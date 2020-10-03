const { isIDGood, handleError } = require('../../middleware/utils')
const { matchedData } = require('express-validator')
const auth = require('../../middleware/auth')
const {
  findUser,
  passwordsDoNotMatch,
  changePasswordInDB
} = require('./helpers')

/**
 * Change password function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const changePassword = async (req, res) => {
  try {
    const id = await isIDGood(req.user._id)
    const user = await findUser(id)
    req = matchedData(req)
    const isPasswordMatch = await auth.checkPassword(req.oldPassword, user)
    if (!isPasswordMatch) {
      handleError(res, await passwordsDoNotMatch())
    } else {
      // all ok, proceed to change password
      res.status(200).json(await changePasswordInDB(id, req))
    }
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { changePassword }
