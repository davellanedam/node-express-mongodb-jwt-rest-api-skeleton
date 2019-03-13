const nodemailer = require('nodemailer')
const mg = require('nodemailer-mailgun-transport')
const crypto = require('crypto')
const algorithm = 'aes-256-ecb'
const password = process.env.JWT_SECRET
const requestIp = require('request-ip')
const i18n = require('i18n')
const User = require('../models/user')

/**
 * Builds sorting
 * @param {string} sort - field to sort from
 * @param {number} order - order for query (1,-1)
 */
const buildSort = (sort, order) => {
  const sortBy = {}
  sortBy[sort] = order
  return sortBy
}

/**
 * Removes extension from file
 * @param {string} file - filename
 */
exports.removeExtensionFromFile = file => {
  return file
    .split('.')
    .slice(0, -1)
    .join('.')
    .toString()
}

/**
 * Gets IP from user
 * @param {*} req - request object
 */
exports.getIP = req => requestIp.getClientIp(req)

/**
 * Gets browser info from user
 * @param {*} req - request object
 */
exports.getBrowserInfo = req => req.headers['user-agent']

/**
 * Gets country from user using CloudFlare header 'cf-ipcountry'
 * @param {*} req - request object
 */
exports.getCountry = req =>
  req.headers['cf-ipcountry'] ? req.headers['cf-ipcountry'] : 'XX'

/**
 * Checks User model if user with an specific email exists
 * @param {string} email - user email
 */
exports.emailExists = async email => {
  return new Promise((resolve, reject) => {
    User.findOne(
      {
        email
      },
      (err, item) => {
        if (err) {
          reject(this.buildErrObject(422, err.message))
        }
        if (item) {
          reject(this.buildErrObject(422, 'EMAIL_ALREADY_EXISTS'))
        }
        resolve(false)
      }
    )
  })
}

/**
 * Checks User model if user with an specific email exists but excluding user id
 * @param {string} id - user id
 * @param {string} email - user email
 */
exports.emailExistsExcludingMyself = async (id, email) => {
  return new Promise((resolve, reject) => {
    User.findOne(
      {
        email,
        _id: {
          $ne: id
        }
      },
      (err, item) => {
        if (err) {
          reject(this.buildErrObject(422, err.message))
        }
        if (item) {
          reject(this.buildErrObject(422, 'EMAIL_ALREADY_EXISTS'))
        }
        resolve(false)
      }
    )
  })
}

/**
 * Sends email
 * @param {Object} data - data
 * @param {boolean} callback - callback
 */
exports.sendEmail = async (data, callback) => {
  const auth = {
    auth: {
      api_key: process.env.EMAIL_SMTP_API_MAILGUN,
      domain: process.env.EMAIL_SMTP_DOMAIN_MAILGUN
    }
  }
  const transporter = nodemailer.createTransport(mg(auth))
  const mailOptions = {
    from: `${process.env.EMAIL_FROM_NAME} <${process.env.EMAIL_FROM_ADDRESS}>`,
    to: `${data.user.name} <${data.user.email}>`,
    subject: data.subject,
    html: data.htmlMessage
  }
  transporter.sendMail(mailOptions, err => {
    if (err) {
      return callback(false)
    }
    return callback(true)
  })
}

/**
 * Sends registration email
 * @param {string} locale - locale
 * @param {Object} user - user object
 */
exports.sendRegistrationEmailMessage = async (locale, user) => {
  i18n.setLocale(locale)
  const subject = i18n.__('registration.SUBJECT')
  const htmlMessage = i18n.__(
    'registration.MESSAGE',
    user.name,
    process.env.FRONTEND_URL,
    user.verification
  )
  const data = {
    user,
    subject,
    htmlMessage
  }
  const email = {
    subject,
    htmlMessage,
    verification: user.verification
  }

  if (process.env.NODE_ENV === 'production') {
    this.sendEmail(data, messageSent =>
      messageSent
        ? console.log(`Email SENT to: ${user.email}`)
        : console.log(`Email FAILED to: ${user.email}`)
    )
  } else if (process.env.NODE_ENV === 'development') {
    console.log(email)
  }
}

/**
 * Sends reset password email
 * @param {string} locale - locale
 * @param {Object} user - user object
 */
exports.sendResetPasswordEmailMessage = async (locale, user) => {
  i18n.setLocale(locale)
  const subject = i18n.__('forgotPassword.SUBJECT')
  const htmlMessage = i18n.__(
    'forgotPassword.MESSAGE',
    user.email,
    process.env.FRONTEND_URL,
    user.verification
  )
  const data = {
    user,
    subject,
    htmlMessage
  }
  const email = {
    subject,
    htmlMessage,
    verification: user.verification
  }
  if (process.env.NODE_ENV === 'production') {
    this.sendEmail(data, messageSent =>
      messageSent
        ? console.log(`Email SENT to: ${user.email}`)
        : console.log(`Email FAILED to: ${user.email}`)
    )
  } else if (process.env.NODE_ENV === 'development') {
    console.log(email)
  }
}

/**
 * Encrypts text
 * @param {string} text - text to encrypt
 */
exports.encrypt = text => {
  const cipher = crypto.createCipher(algorithm, password)
  let crypted = cipher.update(text, 'utf8', 'hex')
  crypted += cipher.final('hex')
  return crypted
}

/**
 * Decrypts text
 * @param {string} text - text to decrypt
 */
exports.decrypt = text => {
  const decipher = crypto.createDecipher(algorithm, password)
  try {
    let dec = decipher.update(text, 'hex', 'utf8')
    dec += decipher.final('utf8')
    return dec
  } catch (err) {
    return err
  }
}

/**
 * Handles error by printing to console in development env and builds and sends an error response
 * @param {Object} res - response object
 * @param {Object} err - error object
 */
exports.handleError = (res, err) => {
  // Prints error in console
  if (process.env.NODE_ENV === 'development') {
    console.log(err)
  }
  // Sends error to user
  res.status(err.code).json({
    errors: {
      msg: err.message
    }
  })
}

/**
 * Builds error object
 * @param {number} code - error code
 * @param {string} message - error text
 */
exports.buildErrObject = (code, message) => {
  return {
    code,
    message
  }
}

/**
 * Builds success object
 * @param {string} message - success text
 */
exports.buildSuccObject = message => {
  return {
    msg: message
  }
}

/**
 * Checks if given ID is good for MongoDB
 * @param {string} id - id to check
 */
exports.isIDGood = async id => {
  return new Promise((resolve, reject) => {
    const goodID = String(id).match(/^[0-9a-fA-F]{24}$/)
    return goodID
      ? resolve(id)
      : reject(this.buildErrObject(422, 'ID_MALFORMED'))
  })
}

/**
 * Checks the query string for filtering records
 * query.filter should be the text to search (string)
 * query.fields should be the fields to search into (array)
 * @param {Object} query - query object
 */
exports.checkQueryString = async query => {
  return new Promise((resolve, reject) => {
    try {
      if (
        typeof query.filter !== 'undefined' &&
        typeof query.fields !== 'undefined'
      ) {
        const data = {
          $or: []
        }
        const array = []
        // Takes fields param and builds an array by splitting with ','
        const arrayFields = query.fields.split(',')
        // Adds SQL Like %word% with regex
        arrayFields.map(item => {
          array.push({
            [item]: {
              $regex: new RegExp(query.filter, 'i')
            }
          })
        })
        // Puts array result in data
        data.$or = array
        resolve(data)
      } else {
        resolve({})
      }
    } catch (err) {
      console.log(err.message)
      reject(this.buildErrObject(422, 'ERROR_WITH_FILTER'))
    }
  })
}

/**
 * Builds initial options for query
 * @param {Object} query - query object
 */
exports.listInitOptions = async req => {
  const order = req.query.order || -1
  const sort = req.query.sort || 'createdAt'
  const sortBy = buildSort(sort, order)
  const page = parseInt(req.query.page) || 1
  const limit = parseInt(req.query.limit) || 5
  const options = {
    sort: sortBy,
    lean: true,
    page,
    limit
  }
  return options
}

/**
 * Hack for mongoose-paginate, removes 'id' from results
 * @param {Object} result - result object
 */
exports.cleanPaginationID = result => {
  result.docs.map(element => delete element.id)
  return result
}
