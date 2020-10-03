const { matchedData } = require('express-validator')
const City = require('../../models/city')
const db = require('../../middleware/db')
const { isIDGood, handleError } = require('../../middleware/utils')

/**
 * Get item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getItem = async (req, res) => {
  try {
    req = matchedData(req)
    const id = await isIDGood(req.id)
    res.status(200).json(await db.getItem(id, City))
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { getItem }
