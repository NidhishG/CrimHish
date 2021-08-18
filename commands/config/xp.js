const L = require('../../models/levelling')

const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'xp',
  description: 'Sets xp for a server',
  
 async run(client, message, args) {
   if(!message.member.permissions.has('BAN_MEMBERS')) return message.channel.send('Step one: get permissions.')
if(!args[0]) return message.channel.send(new MessageEmbed()
.setTitle(`XP command`)
.setDescription(`Usage:\n\`!xp on\` - Enables xp in the server\n\`!xp off\` - Disables xp in the server`)
)
if(args[0] == 'on') {
L.findOne({guildID: message.guild.id }, async(err, data) => {
  if(err) throw err;
  if(!data) {
    L.create({
      guildID: message.guild.id,
      life: true,
      send: true
    })
  } else {
    data.life = true
  }
 await data.save()
})
message.channel.send('Enabled xp!')
  } else if(args[0] == 'off') {
    L.findOne({guildID: message.guild.id }, async(err, data) => {
  if(err) throw err;
  if(!data) {
    L.create({
      guildID: message.guild.id,
      life: false,
      send: true
    })
  } else {
    data.life = false 
  }
 await data.save()
})
message.channel.send('Disabled xp')
  } else if(args[0] == 'null') {
    L.findOne({guildID: message.guild.id }, async(err, data) => {
  if(err) throw err;
  if(!data) {
    L.create({
      guildID: message.guild.id,
      life: true, 
      send: null
    })
  } else {
    data.send = null 
  }
 await data.save()
})
message.channel.send('No more levelling messages!')
  } else if(args[0] == 'send') {
        L.findOne({guildID: message.guild.id }, async (err, data) => {
  if(!data) {
    L.create({
      guildID: message.guild.id,
      life: true, 
      send: true
    })
  } else {
    data.send = true
  }
 await data.save()
})
message.channel.send('Levelling messages enabled!')
  }
  }
}