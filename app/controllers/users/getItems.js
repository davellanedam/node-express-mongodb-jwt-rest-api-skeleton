const User = require('../../models/user')
const { handleError } = require('../../middleware/utils')
const db = require('../../middleware/db')

/**
 * Get items function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getItems = async (req, res) => {
  try {
    const query = await db.checkQueryString(req.query)
    res.status(200).json(await db.getItems(req, User, query))
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { getItems }
