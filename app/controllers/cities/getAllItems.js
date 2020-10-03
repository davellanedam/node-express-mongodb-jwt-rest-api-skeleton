const utils = require('../../middleware/utils')
const { getAllItemsFromDB } = require('./helpers')

/**
 * Get all items function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getAllItems = async (req, res) => {
  try {
    res.status(200).json(await getAllItemsFromDB())
  } catch (error) {
    utils.handleError(res, error)
  }
}

module.exports = { getAllItems }
