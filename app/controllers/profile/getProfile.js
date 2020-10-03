const { getProfileFromDB } = require('./helpers')
const { isIDGood, handleError } = require('../../middleware/utils')

/**
 * Get profile function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getProfile = async (req, res) => {
  try {
    const id = await isIDGood(req.user._id)
    res.status(200).json(await getProfileFromDB(id))
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { getProfile }
