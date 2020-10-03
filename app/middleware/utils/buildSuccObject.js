/**
 * Builds success object
 * @param {string} message - success text
 */
const buildSuccObject = (message = '') => {
  return {
    msg: message
  }
}

module.exports = { buildSuccObject }
