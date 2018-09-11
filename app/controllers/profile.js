const model = require('../models/user')
const base = require('./base')

/*********************
 * Private functions *
 *********************/

const updateProfileInDB = async (req, id) => {
  delete req.body._id
  delete req.body.role
  delete req.body.email
  return new Promise((resolve, reject) => {
    model.findByIdAndUpdate(
      id,
      req.body, {
        'new': true,
        runValidators: true,
        select: '-role -_id -updatedAt -createdAt'
      },
      (err, user) => {
        if (err) {
          reject(base.buildErrObject(422, err.message))
        }
        if (!user) {
          reject(base.buildErrObject(404, 'NOT_FOUND'))
        }
        resolve(user)
      }
    )
  })
}

const getProfileFromDB = async (id) => {
  return new Promise((resolve, reject) => {
    model.findById(id, '-role -_id -updatedAt -createdAt', (err, user) => {
      if (err) {
        reject(base.buildErrObject(422, err.message))
      }
      if (!user) {
        reject(base.buildErrObject(404, 'NOT_FOUND'))
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
    const id = await base.isIDGood(req.user._id)
    res.status(200).json(await getProfileFromDB(id))
  } catch (error) {
    base.handleError(res, error)
  }
}

exports.updateProfile = async (req, res) => {
  try {
    const id = await base.isIDGood(req.user._id)
    res.status(200).json(await updateProfileInDB(req, id))
  } catch (error) {
    base.handleError(res, error)
  }
}
