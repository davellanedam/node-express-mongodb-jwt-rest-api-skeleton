require('dotenv-safe').config()
const initMongo = require('./config/mongo')
const fs = require('fs')
const modelsPath = `./app/models`

initMongo()

// Removes extension from file
const removeExtension = file => {
  file = file
    .split('.')
    .slice(0, -1)
    .join('.')
    .toString()
  return file
}

// Loop models path and loads every file as a model except index file
const models = fs
  .readdirSync(modelsPath)
  .filter(file => {
    return file !== 'index.js'
  })
  .map(file => {
    return removeExtension(file)
  })

const completed = () => {
  console.log('Cleanup complete!')
  process.exit(0)
}

const processModels = model =>
  new Promise((resolve, reject) => {
    model = require(`./app/models/${model}`)
    model.remove({}, (err, row) => {
      if (err) {
        reject(err)
      } else {
        resolve(row)
      }
    })
  })

Promise.all(models.map(processModels)).then(completed)
