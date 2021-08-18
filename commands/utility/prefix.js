const db = require('quick.db')

module.exports = {
    name: 'prefix',
    aliases: ['setprefix'],
    description: 'sets a prefix for a guild',
    async run(client, message, args) {
        if(!message.member.permissions.has('BAN_MEMBERS')) return message.reply('why do these people always try to run permission only commands damn it :sob:')
        if(!args[0]) return message.reply('You did not mention the prefix you want to set it to.')
        if(args.length > 6) return message.reply('Prefix can not be more than 6 letters')
        await db.set(`prefix_${message.guild.id}`, args[0])
        message.channel.send(`I have set your prefix to \`${args[0]}\`!
`)
    }
}