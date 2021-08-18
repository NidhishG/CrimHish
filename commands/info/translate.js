const axios = require('axios')
const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'translate',
  aliases: ['translatetext'],
  descripton: 'translates a text to a given language',
  run: async(client, message, args) => {
    if(!args[0]) return message.reply('Please mention a language to translate to.')
    const text = args.slice(1).join(" ")
    if(!text) return message.reply('Please add text to what you want to translate.')

    const body = await axios.get(`http://luminabot.xyz/api/translate?text=${text}&tolang=${args[0]}`)
    const res = body.data

    const embed = new MessageEmbed()
    .setColor('ff0000')
    .setTitle('Translator')
    .addField('Input:', `\`\`\`${text}\`\`\``)
    .addField('Output:', `\`\`\`${res.translated}\`\`\``)
    .addField('Translated to:', `\`\`\`${args[0]}\`\`\``)
    .setFooter('Google Translator')
    message.channel.send(embed)

  }
}