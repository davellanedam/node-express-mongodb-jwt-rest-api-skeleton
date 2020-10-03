const { buildErrObject } = require('./buildErrObject')

/**
 * Item already exists
 * @param {Object} err - error object
 * @param {Object} item - item result object
 * @param {Object} reject - reject object
 * @param {string} message - message
 */
const itemAlreadyExists = (err, item, message) => {
  return new Promise((resolve, reject) => {
    if (err) {
      reject(buildErrObject(422, err.message))
    }
    if (item) {
      reject(buildErrObject(422, message))
    }
    resolve()
  })
}

module.exports = { itemAlreadyExists }
