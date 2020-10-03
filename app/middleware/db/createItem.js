const { buildErrObject } = require('../../middleware/utils')

/**
 * Creates a new item in database
 * @param {Object} req - request object
 */
const createItem = (req = {}, model = {}) => {
  return new Promise((resolve, reject) => {
    model.create(req, (err, item) => {
      if (err) {
        reject(buildErrObject(422, err.message))
      }
      resolve(item)
    })
  })
}

module.exports = { createItem }
