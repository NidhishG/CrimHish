const axios = require('axios')
const Discord = require('discord.js')

module.exports = {
  name: 'twitch',
  aliases: ['ttv'],
  description: 'search for a twitch user',
  async run(client, message, args) {
  if(!args[0]) return message.reply('Please enter a valid twitch user.')

  const body = await axios.get(`https://luminabot.xyz/api/json/twitch-info?username=${args[0]}`)
  const res = body.data
  if(!res.thumbnail) return message.channel.send('Not real profile');

  const embed = new Discord.MessageEmbed()
  .setColor('ff0000')
  .setTitle(`${args[0]}`)
  .setURL(`https://twitch.tv/${res.displayname}`)
  .setThumbnail(`${res.thumbnail}`)
  .setDescription(`Searching twitch for ${args[0]}`)
  .addField('Display Name:', `${res.displayname ? res.displayname : 'No DisplayName'}`, true)
  .addField('Date Created:', `${res.created_on ?res.created_on : 'No created on..?'}`, true)
  .addField('Followers:', `\`${res.followers ? res.followers : 'No followers'}\``, true)
  .addField('Views:', `\`${res.views ? res.views : 'No Views'}\``, true)
  .addField('Last Live:', `\`${res.last_live ? res.last_live : 'No last live?'}\``, true)
  .addField('Last Streamed Game:', `\`${res.stream.latest_game ? res.stream.latest_game : 'No last live?'}\``, true)
  .addField('Description:', `${res.description ? res.description : 'No Description'}`, true)
 await message.channel.send(embed)
  }
}