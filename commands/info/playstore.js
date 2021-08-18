const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'playstore',
    aliases: ['appstore'],
    description: 'search the play store for a game',
    cooldown: 5,
    usage: 'playstore <game>',
    async run(client, message, args){
                let game = args.join(" ")

        const axios = require(`axios`)
        const body = await axios.get(`https://api.popcatdev.repl.co/playstore?q=${game}`)
        const res = body.data
        if(game){
        const embed = new MessageEmbed()
        .setTitle('Play Store!')
        .setDescription(`Giving info for ${game}`)
        .setColor(`ff0000`)
        .addField('**App:**', `${res.title}`, inline = true)
        .addField('**Company:**', `${res.developer}`, inline = true)
        .addField('**Ratings:**', `\`${res.ratings}\``, inline = true)
        .addField('**Downloads:**', `\`${res.installations}\``, inline = true)
        .addField('**Genre:**', `${res.genre}`, inline = true)
        .addField('**URL:**', `${res.url}`, inline = true)
        .addField('**One Review:**', `${res.comment}`, inline = true)
        
        message.channel.send(embed)
        } else return message.reply(`give me a game to search`)
    }
}