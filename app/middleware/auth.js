const crypto = require('crypto')

const password = process.env.JWT_SECRET
const algorithm = 'aes-192-cbc'
// Key length is dependent on the algorithm. In this case for aes192, it is
// 24 bytes (192 bits).
const key = crypto.scryptSync(password, 'salt', 24)
const iv = Buffer.alloc(16, 0) // Initialization crypto vector

module.exports = {
  /**
   * Checks is password matches
   * @param {string} password - password
   * @param {Object} user - user object
   * @returns {boolean}
   */
  async checkPassword(password, user) {
    return new Promise((resolve, reject) => {
      user.comparePassword(password, (err, isMatch) => {
        if (err) {
          reject(this.buildErrObject(422, err.message))
        }
        if (!isMatch) {
          resolve(false)
        }
        resolve(true)
      })
    })
  },

  /**
   * Encrypts text
   * @param {string} text - text to encrypt
   */

  encrypt(text) {
    const cipher = crypto.createCipheriv(algorithm, key, iv)

    let encrypted = cipher.update(text, 'utf8', 'hex')
    encrypted += cipher.final('hex')

    return encrypted
  },

  /**
   * Decrypts text
   * @param {string} text - text to decrypt
   */

  decrypt(text) {
    const decipher = crypto.createDecipheriv(algorithm, key, iv)

    try {
      let decrypted = decipher.update(text, 'hex', 'utf8')
      decrypted += decipher.final('utf8')
      return decrypted
    } catch (err) {
      return err
    }
  }
}
