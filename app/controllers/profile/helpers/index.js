const { changePasswordInDB } = require('./changePasswordInDB')
const { findUser } = require('./findUser')
const { getProfileFromDB } = require('./getProfileFromDB')
const { updateProfileInDB } = require('./updateProfileInDB')

module.exports = {
  changePasswordInDB,
  findUser,
  getProfileFromDB,
  updateProfileInDB
}
