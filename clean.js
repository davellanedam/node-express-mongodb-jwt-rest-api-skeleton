require('dotenv-safe').config()
const initMongo = require('./config/mongo')
const fs = require('fs')
const modelsPath = `./app/models`
const { removeExtensionFromFile } = require('./app/middleware/utils')

initMongo()

// Loop models path and loads every file as a model except index file
const models = fs.readdirSync(modelsPath).filter(file => {
  return removeExtensionFromFile(file) !== 'index'
})

const deleteModelFromDB = model => {
  return new Promise((resolve, reject) => {
    model = require(`./app/models/${model}`)
    model.deleteMany({}, (err, row) => {
      if (err) {
        reject(err)
      } else {
        resolve(row)
      }
    })
  })
}

const clean = async () => {
  try {
    const promiseArray = models.map(
      async model => await deleteModelFromDB(model)
    )
    await Promise.all(promiseArray)
    console.log('Cleanup complete!')
    process.exit(0)
  } catch (err) {
    console.log(err)
    process.exit(0)
  }
}

clean()
