const moment = require('moment')
/**
 * Calculate user block due time.
 * @param {Date} blockExpires - user block expires
 */
const formatDuetime = (blockExpires = Date()) =>
  moment(blockExpires).format('YYYY_MM_DD_mm_ss')

module.exports = { formatDuetime }
