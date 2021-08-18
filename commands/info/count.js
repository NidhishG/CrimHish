const { MessageEmbed } = require('discord.js');
const schema = require('../../models/counting');
module.exports = {
  name: 'count',
  description: 'get invites for the bot',
  async run(client, message, args){
    schema.findOne({ guild: message.guild.id }, async(err, data) => {
      const embed = new MessageEmbed()
      .setTitle(`${message.guild.name}'s Count`)
      .setFooter(`Requested by ${message.author.tag}`)
      .setTimestamp()
      .setColor('RANDOM')

      if(!data || !data.amount) embed.setDescription(`${message.guild.name}'s count is currently at \`0\``)
      else embed.setDescription(`${message.guild.name}'s count is currently at \`${data.amount}\``)

      message.channel.send(embed)
    })
  }
}