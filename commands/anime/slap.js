const { MessageEmbed }= require('discord.js')

module.exports = {
  name: 'slap',
  description: 'anime slap action',
  async run(client, message, args){
    const user = message.mentions.users.first() 
        const Anime_Images = require('anime-images-api')
    const API = new Anime_Images()
    let { image } = await API.sfw.slap()

    if(user){
    const embed = new MessageEmbed()
    .setTitle(`${message.author.username} slapped ${user.username}`)
    .setColor('ff0000')
    .setImage(image)
    message.channel.send(embed)
    } else {
          const embed = new MessageEmbed()
    .setTitle(`${message.author.username} is so clueless they slapped themself`)
    .setColor('ff0000')
    .setImage(image)
        message.channel.send(embed)
    }
  }
}