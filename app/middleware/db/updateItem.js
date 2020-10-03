const { itemNotFound } = require('../../middleware/utils')

/**
 * Updates an item in database by id
 * @param {string} id - item id
 * @param {Object} req - request object
 */
const updateItem = (id, model, req) => {
  return new Promise((resolve, reject) => {
    model.findByIdAndUpdate(
      id,
      req,
      {
        new: true,
        runValidators: true
      },
      (err, item) => {
        itemNotFound(err, item, reject, 'NOT_FOUND')
        resolve(item)
      }
    )
  })
}

module.exports = { updateItem }
