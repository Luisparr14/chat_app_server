const { verifyJWT } = require("../utils/jwt")

const socket = (io = io) => {
  io.on('connection', (client) => {
    console.log(`Client connected...`)
    const token = client.handshake.headers['x-token']
    const { uid, valid } = verifyJWT(token, process.env.JWT_SECRET)

    if (!valid) return client.disconnect()
    console.log(`Client authenticated...`, uid)

    client.on('disconnect', () => {
      console.log(`Client disconnected...`)
    })
  })
}

module.exports = socket