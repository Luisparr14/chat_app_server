const socket = (io) => {
  io.on('connection', (client) => {
    console.log(`Client ${client.id} connected...`)
  })
}

module.exports = socket