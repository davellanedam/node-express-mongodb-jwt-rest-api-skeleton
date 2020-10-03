const express = require('express')
const router = express.Router()
require('../../config/passport')
const passport = require('passport')
const requireAuth = passport.authenticate('jwt', {
  session: false
})
const trimRequest = require('trim-request')

const { roleAuthorization } = require('../controllers/auth')

const {
  getAllCities,
  getCities,
  createCity,
  getCity,
  updateCity,
  deleteCity
} = require('../controllers/cities')

const {
  validateCreateCity,
  validateGetCity,
  validateUpdateCity,
  validateDeleteCity
} = require('../controllers/cities/validators')

/*
 * Cities routes
 */

/*
 * Get all items route
 */
router.get('/all', getAllCities)

/*
 * Get items route
 */
router.get(
  '/',
  requireAuth,
  roleAuthorization(['admin']),
  trimRequest.all,
  getCities
)

/*
 * Create new item route
 */
router.post(
  '/',
  requireAuth,
  roleAuthorization(['admin']),
  trimRequest.all,
  validateCreateCity,
  createCity
)

/*
 * Get item route
 */
router.get(
  '/:id',
  requireAuth,
  roleAuthorization(['admin']),
  trimRequest.all,
  validateGetCity,
  getCity
)

/*
 * Update item route
 */
router.patch(
  '/:id',
  requireAuth,
  roleAuthorization(['admin']),
  trimRequest.all,
  validateUpdateCity,
  updateCity
)

/*
 * Delete item route
 */
router.delete(
  '/:id',
  requireAuth,
  roleAuthorization(['admin']),
  trimRequest.all,
  validateDeleteCity,
  deleteCity
)

module.exports = router
