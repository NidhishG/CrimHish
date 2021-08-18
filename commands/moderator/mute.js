const { MessageEmbed } = require('discord.js')
const ms = require('ms')

module.exports = {
  name: 'mute',
  description: 'Mutes a member!',
  aliases: ["m"],
  
 async run(client, message, args) {
    if(!message.member.permissions.has('BAN_MEMBERS')) return message.reply('imagine not have perms')
    
    const potato = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    
    let muterole = message.guild.roles.cache.find(r => r.name == 'Muted' || r.name ==  'muted')
    
if(!muterole) {
    let msg = await message.channel.send(new MessageEmbed()
    .setTitle('Creating role...')
    .setDescription(`:x: Created Mute role\n:x: Overwrited channels\n:x: Mute ${potato}`)
    )
    muterole = await message.guild.roles.create({ 
      data: { 
        name: "Muted", 
        color: 0x000000, 
        permissions: [] 
        
      } 
    }) 
  msg.edit(new MessageEmbed()
   .setTitle('Creating role...')
  .setDescription(`:white_check_mark: Created Mute role\n:x: Overwrited channels\n:x: Mute ${potato}`)
  )
    
  message.guild.channels.cache.each(async(channel) => { 
      await channel.updateOverwrite(muterole, { 
        "SEND_MESSAGES": false,
        "ADD_REACTIONS": false, 
        "TALK": false 
      });
  })
    msg.edit(new MessageEmbed()
     .setTitle('Creating role...')
    .setDescription(`:white_check_mark: Created Mute role\n:white_check_mark: Overerited channels\n:white_check_mark: Mute ${potato}`)
    )
    }
if(!args[0]) return message.channel.send('mention someone')
if(potato.roles.cache.has(muterole.id)) return message.channel.send('This person is already muted')
let arr = ["1", "2", "3", "4", "5", "6", "7", "8", "9"]
for(let u = 0; u < arr.length; u++) {
if(args[1] && args[1].startsWith(arr[u])) {
   let reason = args.slice(2).join(" ") || "No reason"
  await message.guild.members.cache.get(potato.id).roles.add(muterole)
  
  message.channel.send(`Muted ${potato} for a duration of ${ms(ms(args[1]))} for \`${reason}\``)
  
  setTimeout(() =>  {
   message.guild.members.cache.get(potato.id).roles.remove(muterole)
   message.channel.send(`${potato} was unmuted!`)
  }, ms(args[1]))
  break;
}}
if(!args[1] || !arr.some(n => args[1].includes(n))) {
  let reason = args.slice(1).join(" ") || "No reason"
  await message.guild.members.cache.get(potato.id).roles.add(muterole)
  
  message.channel.send(`Muted ${potato} for \`${reason}\`!`)
 } else return;

    }
}