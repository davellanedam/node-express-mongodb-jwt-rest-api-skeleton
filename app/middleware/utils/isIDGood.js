const mongoose = require('mongoose')
const { buildErrObject } = require('./buildErrObject')

/**
 * Checks if given ID is good for MongoDB
 * @param {string} id - id to check
 */
const isIDGood = async (id = '') => {
  return new Promise((resolve, reject) => {
    const goodID = mongoose.Types.ObjectId.isValid(id)
    return goodID ? resolve(id) : reject(buildErrObject(422, 'ID_MALFORMED'))
  })
}

module.exports = { isIDGood }
