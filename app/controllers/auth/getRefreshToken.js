const {
  getUserIdFromToken,
  findUserById,
  saveUserAccessAndReturnToken
} = require('./helpers')
const { isIDGood, handleError } = require('../../middleware/utils')

/**
 * Refresh token function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getRefreshToken = async (req, res) => {
  try {
    const tokenEncrypted = req.headers.authorization
      .replace('Bearer ', '')
      .trim()
    let userId = await getUserIdFromToken(tokenEncrypted)
    userId = await isIDGood(userId)
    const user = await findUserById(userId)
    const token = await saveUserAccessAndReturnToken(req, user)
    // Removes user info from response
    delete token.user
    res.status(200).json(token)
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { getRefreshToken }
