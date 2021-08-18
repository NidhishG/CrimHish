const simplydjs = require('simply-djs')

module.exports = {
  name: 'ticket',
  aliases: ['setup-ticket', 'setticket'],
  description: 'setup the ticket system',
  run: async(client, message, args) =>{
    const channel = message.mentions.channels.first()
    if(!channel) return message.channel.send('Please mention a channel to set it in.')
    simplydjs.ticketSystem(message, channel, {
     embedDesc: 'Hit the button below to create a ticket!',
    embedColor: 'ff0000',
    color: 'red', 
    embedFoot: 'Button Ticket',
    timeout: true,
})
  }
}