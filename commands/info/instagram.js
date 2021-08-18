const Discord = require('discord.js')
const axios = require('axios')

module.exports = {
  name: 'instagram',
  aliases: ['ig', 'insta', 'gram'],
  description: 'instagram search command',
  async run(client, message, args) {
     if(!args.slice(0).join(" ")) return message.reply('You did not mention an instagram user.')

     const body = await axios.get(`https://api.popcatdev.repl.co/instagram?user=${args[0]}`)
     const res = body.data
     const embed = new Discord.MessageEmbed()
     .setColor('ff0000')
     .setTitle('Instagram')
     .setThumbnail(res.profile_pic)
     .addField('Username:', res.username)
     .addField('Full Name:', res.full_name)
     .addField('Followers:', `\`${res.followers}\``, true)
     .addField('Posts:', `\`${res.posts}\``, true)
     .addField('Reels:', `\`${res.reels}\``, true)
     .addField('Verified:', res.verified, true)
     .addField('Private:', res.private, true)
     .addField('Description', res.biography)
     message.channel.send(embed)
  }
}