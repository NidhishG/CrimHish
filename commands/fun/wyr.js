const djs = require('djs-fun-v12')

module.exports = {
  name: "wouldyourather",
  aliases: ['wyr'],
  description: "get a would you rather question",
  run(client, message, args) {
    djs.wyr(message)
  }
}