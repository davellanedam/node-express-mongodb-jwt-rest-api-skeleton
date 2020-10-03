const User = require('../../../models/user')
const { itemNotFound } = require('../../../middleware/utils')

/**
 * Gets profile from database by id
 * @param {string} id - user id
 */
const getProfileFromDB = (id = '') => {
  return new Promise((resolve) => {
    User.findById(id, '-_id -updatedAt -createdAt', (err, user) => {
      itemNotFound(err, user, 'NOT_FOUND')
      resolve(user)
    })
  })
}

module.exports = { getProfileFromDB }
