const City = require('../../../models/city')
const utils = require('../../../middleware/utils')

/**
 * Checks if a city already exists in database
 * @param {string} name - name of item
 */
const cityExists = (name) => {
  return new Promise((resolve, reject) => {
    City.findOne(
      {
        name
      },
      (err, item) => {
        utils.itemAlreadyExists(err, item, reject, 'CITY_ALREADY_EXISTS')
        resolve(false)
      }
    )
  })
}

module.exports = { cityExists }
