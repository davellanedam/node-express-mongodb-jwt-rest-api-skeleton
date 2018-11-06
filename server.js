require('dotenv-safe').config()
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const compression = require('compression')
const helmet = require('helmet')
const cors = require('cors')
const passport = require('passport')
const app = express()
const initMongo = require('./config/mongo')
const getExpeditiousCache = require('express-expeditious')
const cache = getExpeditiousCache({
  namespace: 'expresscache',
  defaultTtl: '1 minute',
  engine: require('expeditious-engine-redis')({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
  })
})

// Setup express server
app.set('port', process.env.PORT || 3000)

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}
app.use(
  bodyParser.json({
    limit: '20mb'
  })
)
app.use(
  bodyParser.urlencoded({
    limit: '20mb',
    extended: true
  })
) /* for parsing application/x-www-form-urlencoded ~*/
app.use(cors())
app.use(passport.initialize())
app.use(compression())
app.use(helmet())
// Redis cache enabled only for production
if (process.env.NODE_ENV === 'production') {
  app.use(cache)
}
app.use(express.static('public'))
app.use(require('./app/routes'))
app.listen(app.get('port'))

// Init MongoDB
initMongo()

module.exports = app // for testing
