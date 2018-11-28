const model = require('../models/user')
const { isIDGood, buildErrObject, handleError } = require('./base')

/*********************
 * Private functions *
 *********************/

const updateProfileInDB = async (req, id) => {
  return new Promise((resolve, reject) => {
    delete req.body._id
    delete req.body.role
    delete req.body.email
    model.findById(id, '+password', (err, user) => {
      if (err) {
        reject(buildErrObject(422, err.message))
      }
      if (!user) {
        reject(buildErrObject(404, 'NOT_FOUND'))
      }

      // Asigns new values
      for (const field in req.body) {
        user[field] = req.body[field]
      }

      // Saves in DB
      user.save((error, item) => {
        if (err) {
          reject(buildErrObject(422, error.message))
        }
        // Convert user to object and remove unneeded properties
        const userObject = item.toObject()
        delete userObject._id
        delete userObject.role
        delete userObject.updatedAt
        delete userObject.createdAt
        delete userObject.password
        resolve(userObject)
      })
    })
  })
}

const getProfileFromDB = async id => {
  return new Promise((resolve, reject) => {
    model.findById(id, '-role -_id -updatedAt -createdAt', (err, user) => {
      if (err) {
        reject(buildErrObject(422, err.message))
      }
      if (!user) {
        reject(buildErrObject(404, 'NOT_FOUND'))
      }
      resolve(user)
    })
  })
}

/********************
 * Public functions *
 ********************/

exports.getProfile = async (req, res) => {
  try {
    const id = await isIDGood(req.user._id)
    res.status(200).json(await getProfileFromDB(id))
  } catch (error) {
    handleError(res, error)
  }
}

exports.updateProfile = async (req, res) => {
  try {
    const id = await isIDGood(req.user._id)
    res.status(200).json(await updateProfileInDB(req, id))
  } catch (error) {
    handleError(res, error)
  }
}
