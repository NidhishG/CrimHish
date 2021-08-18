const { MessageEmbed }= require('discord.js')

module.exports = {
  name: 'punch',
  description: 'anime punch action',
  async run(client, message, args){
    const user = message.mentions.users.first() 
        const Anime_Images = require('anime-images-api')
    const API = new Anime_Images()
    let { image } = await API.sfw.punch()

    if(user){
    const embed = new MessageEmbed()
    .setTitle(`${message.author.username} punched ${user.username}`)
    .setColor('ff0000')
    .setImage(image)
    message.channel.send(embed)
    } else {
          const embed = new MessageEmbed()
    .setTitle(`${message.author.username} is so mad they punched themself`)
    .setColor('ff0000')
    .setImage(image)
        message.channel.send(embed)
    }
  }
}