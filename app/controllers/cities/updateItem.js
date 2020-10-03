const City = require('../../models/city')
const db = require('../../middleware/db')
const utils = require('../../middleware/utils')
const { matchedData } = require('express-validator')
const { cityExistsExcludingItself } = require('./helpers')

/**
 * Update item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const updateItem = async (req, res) => {
  try {
    req = matchedData(req)
    const id = await utils.isIDGood(req.id)
    const doesCityExists = await cityExistsExcludingItself(id, req.name)
    if (!doesCityExists) {
      res.status(200).json(await db.updateItem(id, City, req))
    }
  } catch (error) {
    utils.handleError(res, error)
  }
}

module.exports = { updateItem }
