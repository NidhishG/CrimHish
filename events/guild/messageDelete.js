const { MessageEmbed } = require('discord.js')

module.exports = async(client, message) => {
  if(message.author.bot) return;
  
  const snipes = message.client.snipes.get(message.channel.id) || [];
  snipes.unshift({
    content: message.content,
    author: message.author,
    image: message.attachments.first() ? message.attachments.first().url : null,
    date: new Date().toLocaleString("en-US", { dataStyle: "full", timeStyle: "short" })
  })
  snipes.splice(10)
  message.client.snipes.set(message.channel.id, snipes)

//modlogs
    const schema = require(`../../models/modlogs`)
    const modlogshas = await schema.findOne({ _id: message.guild.id })
    if (!modlogshas) {
      return;
    } else {
      schema.findOne({
        _id: message.guild.id
      }, async (err, data) => {
        if (err) throw err;
        const channel = message.guild.channels.cache.get(data.channel);
          const pic = message.attachments.first() ? message.attachments.first().url : null;
  let embed = new MessageEmbed()
  .setColor('ff0000')
  .setTitle('New message deleted!')
  .setDescription(`${message.author} has deleted a message in <#${message.channel.id}>`)
  .addField(`Channel:`, `<#${message.channel.id}>`)
  .addField(`Content`, message.content || 'video/image below', true)
  channel.send(embed)
  if(pic) channel.send(pic)
  

        })
      }



}