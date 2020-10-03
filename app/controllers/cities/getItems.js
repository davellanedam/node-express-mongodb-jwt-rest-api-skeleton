const City = require('../../models/city')
const db = require('../../middleware/db')
const utils = require('../../middleware/utils')

/**
 * Get items function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getItems = async (req, res) => {
  try {
    const query = await db.checkQueryString(req.query)
    res.status(200).json(await db.getItems(req, City, query))
  } catch (error) {
    utils.handleError(res, error)
  }
}

module.exports = { getItems }
