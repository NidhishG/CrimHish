const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'ban',
  description: 'Ban\'s members!',
  aliases: ['b', 'yeet'],
  
 async run(client, message, args) {
if(!message.member.permissions.has('BAN_MEMBERS')) return message.channel.send('Missing BAN_MEMBERS permission!')

    const potato = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    
    const reason = args.slice(1).join(" ") || "No reason"
    
  message.guild.members.cache.get(potato.user.id).ban(reason)
  
  message.channel.send(`Banned ${potato} for \`${reason}\`!`)
    
  }
}