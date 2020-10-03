const User = require('../../../models/user')
const { itemNotFound, buildErrObject } = require('../../../middleware/utils')

/**
 * Checks against user if has quested role
 * @param {Object} data - data object
 * @param {*} next - next callback
 */
const checkPermissions = ({ id = '', roles = [] }, next) => {
  return new Promise((resolve, reject) => {
    User.findById(id, (err, result) => {
      itemNotFound(err, result, 'NOT_FOUND')
      if (roles.indexOf(result.role) > -1) {
        return resolve(next())
      }
      return reject(buildErrObject(401, 'UNAUTHORIZED'))
    })
  })
}

module.exports = { checkPermissions }
