const City = require('../../models/city')
const { matchedData } = require('express-validator')
const { isIDGood, handleError } = require('../../middleware/utils')
const db = require('../../middleware/db')

/**
 * Delete item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const deleteItem = async (req, res) => {
  try {
    req = matchedData(req)
    const id = await isIDGood(req.id)
    res.status(200).json(await db.deleteItem(id, City))
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { deleteItem }
