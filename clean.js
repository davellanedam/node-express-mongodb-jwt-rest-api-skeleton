require('dotenv-safe').config()
const initMongo = require('./config/mongo')
const fs = require('fs')
const modelsPath = `./app/models`
const { removeExtensionFromFile } = require('./app/controllers/base')

initMongo()

// Loop models path and loads every file as a model except index file
const models = fs.readdirSync(modelsPath).filter(file => {
  return removeExtensionFromFile(file) !== 'index'
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
