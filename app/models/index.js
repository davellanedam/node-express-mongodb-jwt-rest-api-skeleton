const fs = require('fs')
const modelsPath = `${__dirname}/`

module.exports = () => {
  /*
   * Load models dynamically
   */

  // Loop models path and loads every file as a model except this file
  fs.readdirSync(modelsPath).filter(file => {
    // Take filename and remove last part (extension)
    const modelFile = file.split('.').slice(0, -1).join('.').toString()
    // Prevents loading of this file
    return (modelFile !== 'index') ? require(`./${modelFile}`) : ''
  })
}
