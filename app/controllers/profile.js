const model = require('../models/user')
const {
  isIDGood,
  buildSuccObject,
  buildErrObject,
  handleError
} = require('./utils')
const { matchedData } = require('express-validator/filter')

/*********************
 * Private functions *
 *********************/

const updateProfileInDB = async (req, id) => {
  return new Promise((resolve, reject) => {
    model.findByIdAndUpdate(
      id,
      req,
      {
        new: true,
        runValidators: true,
        select: '-role -_id -updatedAt -createdAt'
      },
      (err, user) => {
        if (err) {
          reject(buildErrObject(422, err.message))
        }
        if (!user) {
          reject(buildErrObject(404, 'NOT_FOUND'))
        }
        resolve(user)
      }
    )
  })
}

const getProfileFromDB = async id => {
  return new Promise((resolve, reject) => {
    model.findById(id, '-_id -updatedAt -createdAt', (err, user) => {
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

const findUser = async id => {
  return new Promise((resolve, reject) => {
    model.findById(id, 'password email', (err, item) => {
      if (err) {
        reject(buildErrObject(422, err.message))
      }
      if (!item) {
        reject(buildErrObject(404, 'USER_DOES_NOT_EXIST'))
      }
      resolve(item)
    })
  })
}

const checkPassword = async (password, user) => {
  return new Promise((resolve, reject) => {
    user.comparePassword(password, (err, isMatch) => {
      if (err) {
        reject(buildErrObject(422, err.message))
      }
      if (!isMatch) {
        resolve(false)
      }
      resolve(true)
    })
  })
}

const passwordsDoNotMatch = async () => {
  return new Promise(resolve => {
    resolve(buildErrObject(409, 'WRONG_PASSWORD'))
  })
}

const changePasswordInDB = async (id, req) => {
  return new Promise((resolve, reject) => {
    model.findById(id, '+password', (err, user) => {
      if (err) {
        reject(buildErrObject(422, err.message))
      }
      if (!user) {
        reject(buildErrObject(404, 'NOT_FOUND'))
      }

      // Assigns new password to user
      user.password = req.newPassword

      // Saves in DB
      user.save(error => {
        if (err) {
          reject(buildErrObject(422, error.message))
        }
        resolve(buildSuccObject('PASSWORD_CHANGED'))
      })
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
    req = matchedData(req)
    res.status(200).json(await updateProfileInDB(req, id))
  } catch (error) {
    handleError(res, error)
  }
}

exports.changePassword = async (req, res) => {
  try {
    const id = await isIDGood(req.user._id)
    const user = await findUser(id)
    req = matchedData(req)
    const isPasswordMatch = await checkPassword(req.oldPassword, user)
    if (!isPasswordMatch) {
      handleError(res, await passwordsDoNotMatch())
    } else {
      // all ok, proceed to change password
      res.status(200).json(await changePasswordInDB(id, req))
    }
  } catch (error) {
    handleError(res, error)
  }
}
