const { reject } = require('bcrypt/promises')
const { buildSuccObject, itemNotFound } = require('../../middleware/utils')

/**
 * Deletes an item from database by id
 * @param {string} id - id of item
 */
const deleteItem = (id = '', model = {}) => {
  return new Promise((resolve) => {
    model.findByIdAndRemove(id, async (err, item) => {
      try {
        await itemNotFound(err, item, 'NOT_FOUND')
        resolve(buildSuccObject('DELETED'))
      } catch (error) {
        reject(error)
      }
    })
  })
}

module.exports = { deleteItem }
