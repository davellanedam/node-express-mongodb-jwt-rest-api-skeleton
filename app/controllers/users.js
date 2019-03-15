const model = require('../models/user')
const uuid = require('uuid')
const { matchedData } = require('express-validator/filter')
const {
  isIDGood,
  buildSuccObject,
  buildErrObject,
  handleError,
  listInitOptions,
  cleanPaginationID,
  checkQueryString,
  emailExistsExcludingMyself,
  emailExists,
  sendRegistrationEmailMessage
} = require('./utils')

/*********************
 * Private functions *
 *********************/

/**
 * Gets items from database
 * @param {Object} req - request object
 * @param {Object} query - query object
 */
const getItemsFromDB = async (req, query) => {
  const options = await listInitOptions(req)
  return new Promise((resolve, reject) => {
    model.paginate(query, options, (err, items) => {
      if (err) {
        reject(buildErrObject(422, err.message))
      }
      resolve(cleanPaginationID(items))
    })
  })
}

/**
 * Gets item from database by id
 * @param {string} id - item id
 */
const getItemFromDB = async id => {
  return new Promise((resolve, reject) => {
    model.findById(id, (err, item) => {
      if (err) {
        reject(buildErrObject(422, err.message))
      }
      if (!item) {
        reject(buildErrObject(404, 'NOT_FOUND'))
      }
      resolve(item)
    })
  })
}

/**
 * Updates an item in database by id
 * @param {string} id - item id
 * @param {Object} req - request object
 */
const updateItemInDB = async (id, req) => {
  return new Promise((resolve, reject) => {
    model.findByIdAndUpdate(
      id,
      req,
      {
        new: true,
        runValidators: true
      },
      (err, item) => {
        if (err) {
          reject(buildErrObject(422, err.message))
        }
        if (!item) {
          reject(buildErrObject(404, 'NOT_FOUND'))
        }
        resolve(item)
      }
    )
  })
}

/**
 * Creates a new item in database
 * @param {Object} req - request object
 */
const createItemInDB = async req => {
  return new Promise((resolve, reject) => {
    const user = new model({
      name: req.name,
      email: req.email,
      password: req.password,
      role: req.role,
      phone: req.phone,
      city: req.city,
      country: req.country,
      verification: uuid.v4()
    })
    user.save((err, item) => {
      if (err) {
        reject(buildErrObject(422, err.message))
      }
      // Removes properties with rest operator
      const removeProperties = ({
        // eslint-disable-next-line no-unused-vars
        password,
        // eslint-disable-next-line no-unused-vars
        blockExpires,
        // eslint-disable-next-line no-unused-vars
        loginAttempts,
        ...rest
      }) => rest
      resolve(removeProperties(item.toObject()))
    })
  })
}

/**
 * Deletes an item from database by id
 * @param {string} id - id of item
 */
const deleteItemFromDB = async id => {
  return new Promise((resolve, reject) => {
    model.findByIdAndRemove(id, (err, item) => {
      if (err) {
        reject(buildErrObject(422, err.message))
      }
      if (!item) {
        reject(buildErrObject(404, 'NOT_FOUND'))
      }
      resolve(buildSuccObject('DELETED'))
    })
  })
}

/********************
 * Public functions *
 ********************/

/**
 * Get items function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.getItems = async (req, res) => {
  try {
    const query = await checkQueryString(req.query)
    res.status(200).json(await getItemsFromDB(req, query))
  } catch (error) {
    handleError(res, error)
  }
}

/**
 * Get item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.getItem = async (req, res) => {
  try {
    req = matchedData(req)
    const id = await isIDGood(req.id)
    res.status(200).json(await getItemFromDB(id))
  } catch (error) {
    handleError(res, error)
  }
}

/**
 * Update item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.updateItem = async (req, res) => {
  try {
    req = matchedData(req)
    const id = await isIDGood(req.id)
    const doesEmailExists = await emailExistsExcludingMyself(id, req.email)
    if (!doesEmailExists) {
      res.status(200).json(await updateItemInDB(id, req))
    }
  } catch (error) {
    handleError(res, error)
  }
}

/**
 * Create item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.createItem = async (req, res) => {
  try {
    // Gets locale from header 'Accept-Language'
    const locale = req.getLocale()
    req = matchedData(req)
    const doesEmailExists = await emailExists(req.email)
    if (!doesEmailExists) {
      const item = await createItemInDB(req)
      sendRegistrationEmailMessage(locale, item)
      res.status(201).json(item)
    }
  } catch (error) {
    handleError(res, error)
  }
}

/**
 * Delete item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.deleteItem = async (req, res) => {
  try {
    req = matchedData(req)
    const id = await isIDGood(req.id)
    res.status(200).json(await deleteItemFromDB(id))
  } catch (error) {
    handleError(res, error)
  }
}
