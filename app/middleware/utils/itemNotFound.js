const { buildErrObject } = require('./buildErrObject')

/**
 * Item not found
 * @param {Object} err - error object
 * @param {Object} item - item result object
 * @param {Object} reject - reject object
 * @param {string} message - message
 */
const itemNotFound = (err, item, message) => {
  return new Promise((resolve, reject) => {
    if (err) {
      return reject(buildErrObject(422, err.message))
    }
    if (!item) {
      return reject(buildErrObject(404, message))
    }
    resolve()
  })
}

module.exports = { itemNotFound }
