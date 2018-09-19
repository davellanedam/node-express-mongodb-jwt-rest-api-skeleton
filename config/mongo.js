const mongoose = require('mongoose')
const DB_URL = process.env.MONGO_URI
const loadModels = require('../app/models')

module.exports = () => {
  const connect = () => {
    mongoose.Promise = global.Promise

    mongoose.connect(
      DB_URL,
      {
        keepAlive: true,
        reconnectTries: Number.MAX_VALUE
      },
      err => {
        let dbStatus = ''
        if (err) {
          dbStatus = `*    Error connecting to DB: ${err}\n****************************\n`
        }
        dbStatus = `*    DB Connection: OK\n****************************\n`
        // Prints initialization
        console.log('****************************')
        console.log('*    Starting Server')
        console.log(`*    Port: ${process.env.PORT || 3000}`)
        console.log(`*    NODE_ENV: ${process.env.NODE_ENV}`)
        console.log(`*    Database: MongoDB`)
        console.log(dbStatus)
      }
    )
  }
  connect()

  mongoose.connection.on('error', console.log)
  mongoose.connection.on('disconnected', connect)

  loadModels()
}
