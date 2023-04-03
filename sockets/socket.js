const Bands = require('../models/bands')
const Band = require('../models/band')

const socket = (io) => {
  const bands = new Bands()
  bands.addBand(new Band('Queen'))
  bands.addBand(new Band('Bon Jovi'))
  bands.addBand(new Band('Heroes del Silencio'))
  bands.addBand(new Band('Metallica'))
  
  io.on('connection', (client) => {
    console.log(`Client ${client.id} connected...`)
  
    client.on('message', (payload) => {
      console.log(`Payload: ${payload}`)
      io.emit('message', 'Hello from server')
    })

    client.on('emit-message', (payload) => {
      client.broadcast.emit('new-message', payload)
    })
  
    client.on('disconnect', () => {
      console.log('Client disconnected...')
    })

    client.emit('active-bands', bands.getBands())

    client.on('vote-band', (payload) => {
      bands.voteBand(payload.id)
      io.emit('active-bands', bands.getBands())
    })

    client.on('add-band', (payload) => {
      const newBand = new Band(payload.name)
      bands.addBand(newBand)
      io.emit('active-bands', bands.getBands())
    })

    client.on('delete-band', (payload) => {
      bands.deleteBand(payload.id)
      io.emit('active-bands', bands.getBands())
    })
  })
}

module.exports = socket