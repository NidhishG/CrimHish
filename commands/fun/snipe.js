const { Attachment, MessageEmbed } = require('discord.js')

module.exports = {
  name: "snipe",
  description: "Snipes last deleted messages up to 10!",
  run(client, message, args) {
    const snipes = client.snipes.get(message.channel.id) || [];
    const msg = snipes[args[0]-1||0]
    if(!msg) return message.channel.send('Cannot find that snipe id!')
    if(msg) {
    const embed = new MessageEmbed()
    .setColor('ff0000')
    .setAuthor(msg.author.tag, msg.author.displayAvatarURL({ dynamic: true, size: 256}))
    .setDescription(msg.content || 'video/image below')
    .setFooter(`Date: ${msg.date} |${args[0]||1}/${snipes.length}`)
    if(msg.image) embed.addField(`Video/image:`, msg.image)
    message.channel.send(embed)
    }
  }
}