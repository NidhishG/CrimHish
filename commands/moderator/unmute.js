const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'unmute',
  description: 'unmutes members!',
  
  run(client, message, args) {
    if(!message.member.permissions.has('BAN_MEMBERS')) return message.reply('imagine not have perms')
    
    const potato = message.mentions.members.first()
    if(!potato) return message.reply('You did not mention who you wanted to unmute')
    
    let muterole = message.guild.roles.cache.find(r => r.name == 'Muted' || r.name ==  'muted')
    if(!potato.roles.cache.has(muterole.id)) return message.channel.send('This person isnt muted')

    potato.roles.remove(muterole.id)
    message.channel.send(`Unmuted <@${potato.id}>`)

  }
}