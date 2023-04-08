const { connectedUser, disconnectedUser } = require("../services/sockets/sockets.controller")
const { verifyJWT } = require("../utils/jwt")

const socket = (io) => {
  io.on('connection', (client) => {
    console.log(`Client connected...`)
    const token = client.handshake.headers['x-token']
    const { uid, valid } = verifyJWT(token, process.env.JWT_SECRET)

    if (!valid) return client.disconnect()
    client.join(uid)
    console.log(`Client authenticated...`, uid)
    connectedUser(uid)
    
    client.on('personal-message', (payload) => {
      console.log('Personal message', payload)
      io.to(payload.to).emit('personal-message', payload)
    })

    client.on('disconnect', () => {
      console.log(`Client disconnected...`)
      disconnectedUser(uid)
    })
  })

}

module.exports = socket