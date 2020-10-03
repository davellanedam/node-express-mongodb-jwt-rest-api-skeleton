const User = require('../../../models/user')
const utils = require('../../../middleware/utils')

/**
 * Updates profile in database
 * @param {Object} req - request object
 * @param {string} id - user id
 */
const updateProfileInDB = (req, id) => {
  return new Promise((resolve) => {
    User.findByIdAndUpdate(
      id,
      req,
      {
        new: true,
        runValidators: true,
        select: '-role -_id -updatedAt -createdAt'
      },
      (err, user) => {
        utils.itemNotFound(err, user, 'NOT_FOUND')
        resolve(user)
      }
    )
  })
}

module.exports = { updateProfileInDB }
