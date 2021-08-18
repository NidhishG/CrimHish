  
const schema = require("../../models/autorole");
const { MessageEmbed } = require("discord.js");


module.exports = {
    name: 'autorole',
    aliases: ['ar'], 
    description: 'sets a role to give people when they join',
    run: async(client, message, args) => {
        if (!message.member.permissions.has("MANAGE_CHANNELS")) {
            const embed1 = new MessageEmbed()
                .setColor(`#ff0000`)
                .setDescription("❌ **| You are missing the permission of `MANAGE_CHANNELS`**")
            return message.channel.send(embed1)
        }
        if(!args[0]) return message.reply('Please mention weather to do `!autorole on` or `!autorole off`')
        if(args[0] === 'on'){
        const role = message.mentions.roles.first();
        if (!args[1]) {
            const embed1 = new MessageEmbed()
                .setColor(`#ff0000`)
                .setDescription(`**❌ | You need to mention a role`)
            return message.channel.send(embed1)
        }
        await schema.findOne({
            guild: message.guild.id
        }, async (err, data) => {
            if (err) throw err;
            if (data) {
                data.role = role.id
                data.save();
                const embed3 = new MessageEmbed()
                    .setColor(`GREEN`)
                    .setDescription(`**✅ | Successfully set autorole to ${role}**`)
                    .setFooter('do !autorole off to delete it.')
                message.channel.send(embed3)
            } else {
                const newData = new schema({
                    guild: message.guild.id,
                    role: role.id
                });
                newData.save();
                const embed3 = new MessageEmbed()
                    .setColor(`GREEN`)
                    .setDescription(`**✅ | Successfully set autorole to ${role}**`)
                    .setFooter('do !autorole off to delete it.')
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
                    .setDescription(`**✅ | Successfully deleted autorole**`)
                message.channel.send(embed3)
            } else {
            message.channel.send('No data found in this server for autorole.')
            }
        data.save()
        })
        }


    }
}


   