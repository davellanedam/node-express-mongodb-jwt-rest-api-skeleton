require('dotenv-safe').config()
const {
  seedDatabase
} = require('mongo-seeding')
const path = require('path')

const config = {
  databaseConnectionUri: process.env.MONGO_URI,
  inputPath: path.resolve(__dirname, './data'),
  dropDatabase: false
}

seedDatabase(config)
  .then(() => {
    console.log('Seed complete!')
    process.exit(0)
  })
  .catch((err) => {
    console.log(err)
    process.exit(0)
  })
