const City = require('../../../models/city')
const { itemAlreadyExists } = require('../../../middleware/utils')

/**
 * Checks if a city already exists excluding itself
 * @param {string} id - id of item
 * @param {string} name - name of item
 */
const cityExistsExcludingItself = (id, name) => {
  return new Promise((resolve) => {
    City.findOne(
      {
        name,
        _id: {
          $ne: id
        }
      },
      (err, item) => {
        itemAlreadyExists(err, item, 'CITY_ALREADY_EXISTS')
        resolve(false)
      }
    )
  })
}

module.exports = { cityExistsExcludingItself }
