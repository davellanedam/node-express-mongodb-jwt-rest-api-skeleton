/**
 * Builds sorting
 * @param {string} sort - field to sort from
 * @param {number} order - order for query (1,-1)
 */
const buildSort = (sort = '', order = 1) => {
  const sortBy = {}
  sortBy[sort] = order
  return sortBy
}

module.exports = { buildSort }
