require('dotenv-safe').config()
const express = require('express')
const initMongo = require('./app/init/mongo')
const initExpress = require('./app/init/express')
const app = express()

initExpress(app)
initMongo()
app.use(express.static('public'))
app.use(require('./app/routes'))
app.listen(app.get('port'))

module.exports = app // for testing
