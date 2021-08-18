const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'kick',
  description: 'Kicks members!',
  aliases: ['k'],
  
 async run(client, message, args) {
if(!message.member.permissions.has('KICK_MEMBERS')) return message.channel.send('Missing kick_members permission!')

    const potato = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    
    const reason = args.slice(1).join(" ") || "No reason"
    
  message.guild.members.cache.get(potato.id).kick(reason)
  
  message.channel.send(`Kicked ${potato} for \`${reason}\`!`)
    
  }
}