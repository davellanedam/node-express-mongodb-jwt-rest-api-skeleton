const jwt = require('jsonwebtoken')
const User = require('../models/user')
const UserAccess = require('../models/userAccess')
const ForgotPassword = require('../models/forgotPassword')
const base = require('./base')
const uuid = require('uuid')
const {
  addHours
} = require('date-fns')
const {
  matchedData
} = require('express-validator/filter')
const HOURS_TO_BLOCK = 2
const LOGIN_ATTEMPTS = 5


/*********************
 * Private functions *
 *********************/

const generateToken = user => {
  const obj = {
    _id: user
  }
  return base.encrypt(
    jwt.sign(obj, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRATION
    })
  )
}

const setUserInfo = req => {
  const user = {
    _id: req._id,
    name: req.name,
    email: req.email,
    role: req.role,
    verified: req.verified
  }
  return user
}

const saveUserAccessAndReturnToken = async (req, user) => {
  const userAccess = new UserAccess({
    email: user.email,
    ip: base.getIP(req),
    browser: base.getBrowserInfo(req),
    country: base.getCountry(req)
  })
  return new Promise((resolve, reject) => {
    userAccess.save((err) => {
      if (err) {
        reject(base.buildErrObject(422, err.message))
      }
      const userInfo = setUserInfo(user)
      // Returns data with access token
      resolve({
        token: generateToken(user._id),
        user: userInfo
      })
    })
  })
}

const blockUser = async user => {
  return new Promise((resolve, reject) => {
    user.blockExpires = addHours(new Date(), HOURS_TO_BLOCK)
    user.save((err, result) => {
      if (err) {
        reject(base.buildErrObject(422, err.message))
      }
      if (result) {
        resolve(base.buildErrObject(409, 'BLOCKED_USER'))
      }
    })
  })
}

const saveLoginAttemptsToDB = async user => {
  return new Promise((resolve, reject) => {
    user.save((err, result) => {
      if (err) {
        reject(base.buildErrObject(422, err.message))
      }
      if (result) {
        resolve(true)
      }
    })
  })
}

const checkPassword = async (password, user) => {
  return new Promise((resolve, reject) => {
    user.comparePassword(password, (err, isMatch) => {
      if (err) {
        reject(base.buildErrObject(422, err.message))
      }
      if (!isMatch) {
        resolve(false)
      }
      resolve(true)
    })
  })
}

const blockIsExpired = ({
  loginAttempts,
  blockExpires,
}) => loginAttempts > LOGIN_ATTEMPTS && blockExpires <= new Date()

const checkLoginAttemptsAndBlockExpires = async user => {
  return new Promise((resolve, reject) => {
    // Let user try to login again after blockexpires, resets user loginAttempts
    if (blockIsExpired(user)) {
      user.loginAttempts = 0
      user.save((err, result) => {
        if (err) {
          reject(base.buildErrObject(422, err.message))
        }
        if (result) {
          resolve(true)
        }
      })
    } else {
      // User is not blocked, check password (normal behaviour)
      resolve(true)
    }
  })
}

const userIsBlocked = async user => {
  return new Promise((resolve, reject) => {
    if (user.blockExpires > new Date()) {
      reject(base.buildErrObject(409, 'BLOCKED_USER'))
    }
    resolve(true)
  })
}

const findUser = async email => {
  return new Promise((resolve, reject) => {
    User.findOne({
        email
      },
      'password loginAttempts blockExpires name email role verified',
      (err, item) => {
        if (err) {
          reject(base.buildErrObject(422, err.message))
        }
        if (!item) {
          reject(base.buildErrObject(404, 'USER_DOES_NOT_EXISTS'))
        }
        resolve(item)
      }
    )
  })
}

const passwordsDoNotMatch = async user => {
  user.loginAttempts += 1
  await saveLoginAttemptsToDB(user)
  return new Promise((resolve, reject) => {
    if (user.loginAttempts <= LOGIN_ATTEMPTS) {
      resolve(base.buildErrObject(409, 'WRONG_PASSWORD'))
    } else {
      resolve(blockUser(user))
    }
    reject(base.buildErrObject(422, 'ERROR'))
  })
}

const registerUser = async req => {
  const user = new User({
    name: req.name,
    email: req.email,
    password: req.password,
    verification: uuid.v4()
  })
  return new Promise((resolve, reject) => {
    user.save((err, item) => {
      if (err) {
        reject(base.buildErrObject(422, err.message))
      }
      resolve(item)
    })
  })
}

const returnRegisterToken = (item, userInfo) => {
  userInfo.verification = item.verification
  return {
    token: generateToken(item._id),
    user: userInfo
  }
}

const verificationExists = async id => {
  return new Promise((resolve, reject) => {
    User.findOne({
        verification: id,
        verified: false
      },
      (err, user) => {
        if (err) {
          reject(base.buildErrObject(422, err.message))
        }
        if (!user) {
          reject(base.buildErrObject(404, 'NOT_FOUND_OR_ALREADY_VERIFIED'))
        }
        resolve(user)
      }
    )
  })
}

const verifyUser = async user => {
  user.verified = true
  return new Promise((resolve, reject) => {
    user.save((err, item) => {
      if (err) {
        reject(base.buildErrObject(422, err.message))
      }
      resolve({
        email: item.email,
        verified: item.verified
      })
    })
  })
}

const markResetPasswordAsUsed = async (req, forgot) => {
  forgot.used = true
  forgot.ipChanged = base.getIP(req)
  forgot.browserChanged = base.getBrowserInfo(req)
  forgot.countryChanged = base.getCountry(req)
  return new Promise((resolve, reject) => {
    forgot.save((err, item) => {
      if (err) {
        reject(base.buildErrObject(422, err.message))
      }
      if (!item) {
        reject(base.buildErrObject(404, 'NOT_FOUND'))
      }
      resolve({
        msg: 'PASSWORD_CHANGED'
      })
    })
  })
}

const updatePassword = async (password, user) => {
  user.password = password
  return new Promise((resolve, reject) => {
    user.save((err, item) => {
      if (err) {
        reject(base.buildErrObject(422, err.message))
      }
      if (!item) {
        reject(base.buildErrObject(404, 'NOT_FOUND'))
      }
      resolve(item)
    })
  })
}

const findUserToResetPassword = async email => {
  return new Promise((resolve, reject) => {
    User.findOne({
      email
    }, (err, user) => {
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

const findForgotPassword = async id => {
  return new Promise((resolve, reject) => {
    ForgotPassword.findOne({
        verification: id,
        used: false
      },
      (err, item) => {
        if (err) {
          reject(base.buildErrObject(422, err.message))
        }
        if (!item) {
          reject(base.buildErrObject(404, 'NOT_FOUND_OR_ALREADY_USED'))
        }
        resolve(item)
      }
    )
  })
}

const saveForgotPassword = async req => {
  const forgot = new ForgotPassword({
    email: req.body.email,
    verification: uuid.v4(),
    ipRequest: base.getIP(req),
    browserRequest: base.getBrowserInfo(req),
    countryRequest: base.getCountry(req)
  })
  return new Promise((resolve, reject) => {
    forgot.save((err, item) => {
      if (err) {
        reject(base.buildErrObject(422, err.message))
      }
      resolve(item)
    })
  })
}

const forgotPasswordResponse = item => {
  return {
    msg: 'RESET_EMAIL_SENT',
    verification: item.verification
  }
}

const checkPermissions = async (data, next) => {
  return new Promise((resolve, reject) => {
    User.findById(data.id, (err, result) => {
      if (err) {
        reject(base.buildErrObject(422, err.message))
      }
      if (!result) {
        reject(base.buildErrObject(404, 'NOT_FOUND'))
      }
      if (data.roles.indexOf(result.role) > -1) {
        return resolve(next())
      }
      return reject(base.buildErrObject(401, 'UNAUTHORIZED'))
    })
  })
}


/********************
 * Public functions *
 ********************/

exports.login = async (req, res) => {
  try {
    const data = matchedData(req)
    const user = await findUser(data.email)
    await userIsBlocked(user)
    await checkLoginAttemptsAndBlockExpires(user)
    const isPasswordMatch = await checkPassword(data.password, user)
    if (!isPasswordMatch) {
      base.handleError(res, await passwordsDoNotMatch(user))
    } else {
      // all ok, register access and return token
      user.loginAttempts = 0
      await saveLoginAttemptsToDB(user)
      res.status(200).json(await saveUserAccessAndReturnToken(req, user))
    }
  } catch (error) {
    base.handleError(res, error)
  }
}

exports.register = async (req, res) => {
  try {
    req = matchedData(req)
    const doesEmailExists = await base.emailExists(req.email)
    if (!doesEmailExists) {
      const item = await registerUser(req)
      const userInfo = setUserInfo(item)
      const response = returnRegisterToken(item, userInfo)
      base.sendRegistrationEmailMessage(item)
      res.status(201).json(response)
    }
  } catch (error) {
    base.handleError(res, error)
  }
}

exports.verify = async (req, res) => {
  try {
    req = matchedData(req)
    const user = await verificationExists(req.id)
    res.status(200).json(await verifyUser(user))
  } catch (error) {
    base.handleError(res, error)
  }
}

exports.forgotPassword = async (req, res) => {
  try {
    const data = matchedData(req)
    await findUser(data.email)
    const item = await saveForgotPassword(req)
    base.sendResetPasswordEmailMessage(item)
    res.status(200).json(forgotPasswordResponse(item))
  } catch (error) {
    base.handleError(res, error)
  }
}

exports.resetPassword = async (req, res) => {
  try {
    const data = matchedData(req)
    const forgotPassword = await findForgotPassword(data.id)
    const user = await findUserToResetPassword(forgotPassword.email)
    await updatePassword(data.password, user)
    const result = await markResetPasswordAsUsed(req, forgotPassword)
    res.status(200).json(result)
  } catch (error) {
    base.handleError(res, error)
  }
}

exports.roleAuthorization = roles => async (req, res, next) => {
  try {
    const data = {
      id: req.user._id,
      roles
    }
    await checkPermissions(data, next)
  } catch (error) {
    base.handleError(res, error)
  }
}
