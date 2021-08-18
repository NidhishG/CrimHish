const schema = require('../../models/antiinvite')
const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'antiinvite',
  aliases: ['antiinv'],
  description: 'enables/disables anti invite for a server',
  async run(client, message, args) {
      if(!message.member.permissions.has('BAN_MEMBERS')) return message.reply('Mods would hate me if I allowed you to access this command without permissions.')
    if(!args[0]) return message.reply('Please mention `!antiinvite on` or `!antiinvite off`')
    if(args[0] === 'on'){
await schema.findOne({
            guild: message.guild.id
        }, async (err, data) => {
            if (err) throw err;
            if (data) {
                data.guild = message.guild.id
               await data.save();
                const embed3 = new MessageEmbed()
                    .setColor(`GREEN`)
                    .setDescription(`**✅ | Successfully set aintiinvite in this server**`)
                    .setFooter('do !antiinvite off to delete it.')
                message.channel.send(embed3)
            } else {
                const newData = new schema({
                    guild: message.guild.id,
                });
                await newData.save();
                const embed3 = new MessageEmbed()
                    .setColor(`GREEN`)
                    .setDescription(`**✅ | Successfully set anti invite in this server**`)
                    .setFooter('do !antiinvite off to delete it.')
                message.channel.send(embed3)
            }
        })
        } else if(args[0] === 'off'){
            await schema.findOneAndDelete({
            guild: message.guild.id
        }, async (err, data) => {
            if (err) throw err;
            if (data) {
                const embed3 = new MessageEmbed()
                    .setColor(`GREEN`)
                    .setDescription(`**✅ | Successfully deleted anti invite**`)
                message.channel.send(embed3)
            } else {
            message.channel.send('No data found in this server for anti invite.')
            }
        })
        }      
    }
    
  }
