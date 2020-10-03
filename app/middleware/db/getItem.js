const { itemNotFound } = require('../../middleware/utils')

/**
 * Gets item from database by id
 * @param {string} id - item id
 */
const getItem = (id, model) => {
  return new Promise((resolve, reject) => {
    model.findById(id, (err, item) => {
      itemNotFound(err, item, reject, 'NOT_FOUND')
      resolve(item)
    })
  })
}

module.exports = { getItem }
