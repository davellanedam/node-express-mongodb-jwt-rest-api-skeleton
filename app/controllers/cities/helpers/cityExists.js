const City = require('../../../models/city')
const { itemAlreadyExists } = require('../../../middleware/utils')

/**
 * Checks if a city already exists in database
 * @param {string} name - name of item
 */
const cityExists = (name) => {
  return new Promise((resolve) => {
    City.findOne(
      {
        name
      },
      (err, item) => {
        itemAlreadyExists(err, item, 'CITY_ALREADY_EXISTS')
        resolve(false)
      }
    )
  })
}

module.exports = { cityExists }
