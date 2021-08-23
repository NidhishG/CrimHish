const db = require('quick.db')

module.exports = {
  name: 'afk',
  aliases: ['setafk', 'afkset'],
  description: 'sets afk for you',
  async run(client, message, args) {
    let reason = args.join(" ")
        if(!reason) return message.reply(`Please specify a reason to be AFK`)
    await db.set(`afk_${message.author.id}_${message.guild.id}`, reason)
    message.channel.send(`I have set your afk for ${reason}`)
  }
}