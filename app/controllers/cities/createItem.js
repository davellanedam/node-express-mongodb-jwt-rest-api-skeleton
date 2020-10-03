const City = require('../../models/city')
const db = require('../../middleware/db')
const utils = require('../../middleware/utils')
const { matchedData } = require('express-validator')
const { cityExists } = require('./helpers')

/**
 * Create item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const createItem = async (req, res) => {
  try {
    req = matchedData(req)
    const doesCityExists = await cityExists(req.name)
    if (!doesCityExists) {
      res.status(201).json(await db.createItem(req, City))
    }
  } catch (error) {
    utils.handleError(res, error)
  }
}

module.exports = { createItem }
