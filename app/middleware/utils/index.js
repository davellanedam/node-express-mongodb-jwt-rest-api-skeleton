const { buildErrObject } = require('./buildErrObject')
const { buildSuccObject } = require('./buildSuccObject')
const { getBrowserInfo } = require('./getBrowserInfo')
const { getCountry } = require('./getCountry')
const { getIP } = require('./getIP')
const { handleError } = require('./handleError')
const { isIDGood } = require('./isIDGood')
const { itemAlreadyExists } = require('./itemAlreadyExists')
const { itemNotFound } = require('./itemNotFound')
const { removeExtensionFromFile } = require('./removeExtensionFromFile')
const { validateResult } = require('./validateResult')

module.exports = {
  buildErrObject,
  buildSuccObject,
  getBrowserInfo,
  getCountry,
  getIP,
  handleError,
  isIDGood,
  itemAlreadyExists,
  itemNotFound,
  removeExtensionFromFile,
  validateResult
}
