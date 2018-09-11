require('dotenv-safe').config()
const initMongo = require('./app/init/mongo')
const models = ['user', 'userAccess', 'city', 'forgotPassword']

initMongo()

const completed = () => {
  console.log('Cleanup complete!')
  process.exit(0)
}

const processModels = (model) =>
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
