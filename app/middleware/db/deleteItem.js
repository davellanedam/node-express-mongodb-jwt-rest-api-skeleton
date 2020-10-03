const { buildSuccObject, itemNotFound } = require('../../middleware/utils')

/**
 * Deletes an item from database by id
 * @param {string} id - id of item
 */
const deleteItem = (id, model) => {
  return new Promise((resolve) => {
    model.findByIdAndRemove(id, (err, item) => {
      itemNotFound(err, item, 'NOT_FOUND')
      resolve(buildSuccObject('DELETED'))
    })
  })
}

module.exports = { deleteItem }
