const City = require('../../models/city')
const { createItem } = require('../../middleware/db')
const { handleError } = require('../../middleware/utils')
const { matchedData } = require('express-validator')
const { cityExists } = require('./helpers')

/**
 * Create item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const createCity = async (req, res) => {
  try {
    req = matchedData(req)
    const doesCityExists = await cityExists(req.name)
    if (!doesCityExists) {
      res.status(201).json(await createItem(req, City))
    }
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { createCity }
