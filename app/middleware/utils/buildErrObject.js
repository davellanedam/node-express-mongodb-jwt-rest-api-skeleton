/**
 * Builds error object
 * @param {number} code - error code
 * @param {string} message - error text
 */
const buildErrObject = (code = '', message = '') => {
  return {
    code,
    message
  }
}

module.exports = { buildErrObject }
