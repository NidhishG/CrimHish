module.exports = {
  name: 'ping',
  description: 'a basic ping cmd',
  async run(client, message, args){
    message.channel.send('Pong')
  }
}