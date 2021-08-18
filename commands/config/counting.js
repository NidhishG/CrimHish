  
const schema = require("../../models/counting");
const { MessageEmbed } = require("discord.js");


module.exports = {
    name: 'counting',
    aliases: [],
    description: 'sets a channel for counting',
    run: async(client, message, args) => {
        if (!message.member.permissions.has("MANAGE_GUILD")) {
            const embed1 = new MessageEmbed()
                .setColor(`#ff0000`)
                .setDescription("❌ **| You are missing the permission of `MANAGE_GUILD`**")
            return message.channel.send(embed1)
        }
        if(!args[0]) return message.reply('Please mention weather to do `!counting on` or `!counting off`')
        if(args[0] === 'on'){
        const channel = message.mentions.channels.first();
        if (!args[1]) {
            const embed1 = new MessageEmbed()
                .setColor(`#ff0000`)
                .setDescription(`**❌ | You need to mention a channel`)
            return message.channel.send(embed1)
        }
        await schema.findOne({
            guild: message.guild.id
        }, async (err, data) => {
            if (err) throw err;
            if (data) {
                data.channel = channel.id
                data.save();
                const embed3 = new MessageEmbed()
                    .setColor(`GREEN`)
                    .setDescription(`**✅ | Successfully set counting in <#${channel.id}>**`)
                message.channel.send(embed3)
            } else {
                const newData = new schema({
                    guild: message.guild.id,
                    channel: channel.id
                });
                newData.save();
                const embed3 = new MessageEmbed()
                    .setColor(`GREEN`)
                    .setDescription(`**✅ | Successfully set counting bot in <#${channel.id}>**`)
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
                    .setDescription(`**✅ | Successfully deleted counting channel**`)
                message.channel.send(embed3)
            } else {
            message.channel.send('No data found in this server for counting.')
            }
        //data.save()
        })
        }
    }
}