  
const schema = require("../../models/chatbot");
const { MessageEmbed } = require("discord.js");


module.exports = {
    name: 'chatbot',
    aliases: ['ai', 'configchatbot'], 
    description: 'sets a channel for modlogs',
    run: async(client, message, args) => {
        if (!message.member.permissions.has("MANAGE_CHANNELS")) {
            const embed1 = new MessageEmbed()
                .setColor(`#ff0000`)
                .setDescription("❌ **| You are missing the permission of `MANAGE_CHANNELS`**")
            return message.channel.send(embed1)
        }
        if(!args[0]) return message.reply('Please mention weather to do `!chatbot on` or `!chatbot off`')
        if(args[0] === 'on'){
        const channel = message.mentions.channels.first();
        if (!args[1]) {
            const embed1 = new MessageEmbed()
                .setColor(`#ff0000`)
                .setDescription(`**❌ | You need to mention a channel`)
            return message.channel.send(embed1)
        }
        await schema.findOne({
            _id: message.guild.id
        }, async (err, data) => {
            if (err) throw err;
            if (data) {
                data.channel = channel.id
                data.save();
                const embed3 = new MessageEmbed()
                    .setColor(`GREEN`)
                    .setDescription(`**✅ | Successfully set chatbot in <#${channel.id}>**`)
                message.channel.send(embed3)
            } else {
                const newData = new schema({
                    _id: message.guild.id,
                    channel: channel.id
                });
                newData.save();
                const embed3 = new MessageEmbed()
                    .setColor(`GREEN`)
                    .setDescription(`**✅ | Successfully set chatbot bot in <#${channel.id}>**`)
                message.channel.send(embed3)
            }
        })
        } else if(args[0] === 'off'){
            await schema.findOneAndDelete({
            _id: message.guild.id
        }, async (err, data) => {
            if (err) throw err;
            if (data) {
                const embed3 = new MessageEmbed()
                    .setColor(`GREEN`)
                    .setDescription(`**✅ | Successfully deleted chatbot**`)
                message.channel.send(embed3)
            } else {
            message.channel.send('No data found in this server for chatbot.')
            }
        data.save()
        })
        }


    }
}


   