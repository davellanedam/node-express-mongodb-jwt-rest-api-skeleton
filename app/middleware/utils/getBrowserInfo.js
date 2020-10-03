/**
 * Gets browser info from user
 * @param {*} req - request object
 */
const getBrowserInfo = (req) => req.headers['user-agent']

module.exports = { getBrowserInfo }
