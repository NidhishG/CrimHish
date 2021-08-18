const djs = require('djs-fun-v12')

module.exports = {
  name: "rockpaperscissors",
  aliases: ['rps'],
  description: "play rockpaperscissors against the bot",
  run(client, message, args) {
    djs.rps(message)
  }
}