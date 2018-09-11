const model = require('../models/user')
const base = require('./base')
const uuid = require('uuid')
const { matchedData } = require('express-validator/filter')

/*********************
 * Private functions *
 *********************/

const getItemsFromDB = async (req, query) => {
  const options = await base.listInitOptions(req)
  return new Promise((resolve, reject) => {
    model.paginate(query, options, (err, items) => {
      if (err) {
        reject(base.buildErrObject(422, err.message))
      }
      resolve(base.cleanPaginationID(items))
    })
  })
}

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
          reject(base.buildErrObject(422, err.message))
        }
        if (!item) {
          reject(base.buildErrObject(404, 'NOT_FOUND'))
        }
        resolve(item)
      }
    )
  })
}

const getItemFromDB = async id => {
  return new Promise((resolve, reject) => {
    model.findById(id, (err, item) => {
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

const createItemInDB = async req => {
  const user = new model({
    name: req.name,
    email: req.email,
    password: req.password,
    role: req.role,
    verification: uuid.v4()
  })
  return new Promise((resolve, reject) => {
    user.save((err, item) => {
      if (err) {
        reject(base.buildErrObject(422, err.message))
      }
      item = item.toObject()
      delete item.password
      delete item.blockExpires
      delete item.loginAttempts
      resolve(item)
    })
  })
}

const deleteItemFromDB = async id => {
  return new Promise((resolve, reject) => {
    model.findByIdAndRemove(id, (err, item) => {
      if (err) {
        reject(base.buildErrObject(422, err.message))
      }
      if (!item) {
        reject(base.buildErrObject(404, 'NOT_FOUND'))
      }
      resolve(base.buildSuccObject('DELETED'))
    })
  })
}

/********************
 * Public functions *
 ********************/

exports.getItems = async (req, res) => {
  try {
    const query = await base.checkQueryString(req.query.filter)
    res.status(200).json(await getItemsFromDB(req, query))
  } catch (error) {
    base.handleError(res, error)
  }
}

exports.getItem = async (req, res) => {
  try {
    req = matchedData(req)
    const id = await base.isIDGood(req.id)
    res.status(200).json(await getItemFromDB(id))
  } catch (error) {
    base.handleError(res, error)
  }
}

exports.updateItem = async (req, res) => {
  try {
    req = matchedData(req)
    const id = await base.isIDGood(req.id)
    const doesEmailExists = await base.emailExistsExcludingMyself(id, req.email)
    if (!doesEmailExists) {
      res.status(200).json(await updateItemInDB(id, req))
    }
  } catch (error) {
    base.handleError(res, error)
  }
}

exports.createItem = async (req, res) => {
  try {
    req = matchedData(req)
    const doesEmailExists = await base.emailExists(req.email)
    if (!doesEmailExists) {
      const item = await createItemInDB(req)
      base.sendRegistrationEmailMessage(item)
      res.status(201).json(item)
    }
  } catch (error) {
    base.handleError(res, error)
  }
}

exports.deleteItem = async (req, res) => {
  try {
    req = matchedData(req)
    const id = await base.isIDGood(req.id)
    res.status(200).json(await deleteItemFromDB(id))
  } catch (error) {
    base.handleError(res, error)
  }
}
