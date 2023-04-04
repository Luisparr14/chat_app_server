require('dotenv').config()
const cors = require('cors')
const express = require('express')
const logger = require('morgan')
const path = require('path')

const { dbConnection } = require('./database/config')
const { socket } = require('./sockets')
const { version } = require('./package.json')
const app = express()

// Connection to database
dbConnection()

// Routes Available
const routes = require('./routes')

// Create nodejs http server
const server = require('http').createServer(app)

// Create socket.io server
const io = require('socket.io')(server)
socket(io)

// App M
app.use(cors({origin: '*'}))
app.set('port', process.env.PORT || 3000)
const publicPath = path.resolve(__dirname, 'public')
app.use(express.static(publicPath))
app.use(logger('dev'))
app.use(express.json())

// Add routes to app
app.use('/api', routes)

// Add health check
app.get('/health', (_, res) => {
  res.send('OK')
})

// Add version check
app.get('/version', (_, res) => {
  res.send(version)
})

server.listen(app.get('port'), (err) => {
  if (err) return console.log('something bad happened', err)
  console.log(`Example app listening on port ${app.get('port')}`)
})

module.exports = {
  app,
  server,
  io
}