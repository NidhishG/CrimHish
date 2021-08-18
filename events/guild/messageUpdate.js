const { MessageEmbed } = require('discord.js')

module.exports = async(client, oldMessage, newMessage) => {
  if(oldMessage.author.bot) return;

//modlogs
    const schema = require(`../../models/modlogs`)
    const modlogshas = await schema.findOne({ _id: oldMessage.guild.id })
    if (!modlogshas) {
      return;
    } else {
      schema.findOne({
        _id: oldMessage.guild.id
      }, async (err, data) => {
        if (err) throw err;
        const channel = oldMessage.guild.channels.cache.get(data.channel);
    const embed = new MessageEmbed()
    .setAuthor(oldMessage.author.tag, oldMessage.author.displayAvatarURL({ dynamic: true }))
    .setDescription(`**Message by** <@${oldMessage.author.id}> **edited in** <#${oldMessage.channel.id}>`)
    .addField('Old Message:', `\`\`\`${oldMessage.content}\`\`\``)
    .addField('New Message:', `\`\`\`${newMessage.content}\`\`\``)
    .setFooter(`Message ID: ${oldMessage.id} | User ID: ${oldMessage.author.id}`)
    .setColor('ff0000')
    .setTimestamp()
  channel.send(embed)
  

        })
      }

}