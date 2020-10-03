const User = require('../../../models/user')
const utils = require('../../../middleware/utils')

/**
 * Checks against user if has quested role
 * @param {Object} data - data object
 * @param {*} next - next callback
 */
const checkPermissions = (data, next) => {
  return new Promise((resolve, reject) => {
    User.findById(data.id, (err, result) => {
      utils.itemNotFound(err, result, 'NOT_FOUND')
      if (data.roles.indexOf(result.role) > -1) {
        return resolve(next())
      }
      return reject(utils.buildErrObject(401, 'UNAUTHORIZED'))
    })
  })
}

module.exports = { checkPermissions }
