const { changePasswordInDB } = require('./changePasswordInDB')
const { findUser } = require('./findUser')
const { getProfileFromDB } = require('./getProfileFromDB')
const { passwordsDoNotMatch } = require('./passwordsDoNotMatch')
const { updateProfileInDB } = require('./updateProfileInDB')

module.exports = {
  changePasswordInDB,
  findUser,
  getProfileFromDB,
  passwordsDoNotMatch,
  updateProfileInDB
}
