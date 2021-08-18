const Discord = require('discord.js')
const { MessageEmbed } = require(`discord.js`)
module.exports = {
    name: 'tag',
    description: 'tag system',
    aliases: ['customcommands'],
    usage: 'tag add/remove <command> <reply>',
    
    async run(client, message, args) {
          const db = require(`quick.db`)
    const hex = await db.fetch(`color_${message.author.id}`)

        if (!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send('try again... when you have perms')

      if(!args[0]) return message.channel.send(`What would you like to do? \n \`tag add\` or  \`tag remove\``)
        if(args[0] !== 'add' && args[0] !== 'remove') return message.channel.send(`The only valid options are \`tag add\` or \`tag remove\``)
        if(args[0] === 'add'){

        let command = args[1]
        let reply = args.slice(2).join(" ")
        const em = new MessageEmbed()
                .setColor('ff0000')
        .setTitle('Error')
        .setDescription('Missing Command Name')
        .addField('Usage:', '`tag add <command> <reply>`')

        if (!command) return message.channel.send(em)
        const em1 = new MessageEmbed()
                .setColor('ff0000')
        .setTitle('Error')
        .setDescription('Missing Command Reply')
        .addField('Usage:', '`tag add <command> <reply>`')

        if (!reply) return message.channel.send(em1)

                    const em2 = new MessageEmbed()
                .setColor('ff0000')
                .setTitle('Error')
                .setDescription('This tag already exists')

        if(db.get(`tag_${message.guild.id}_${command}`) !== null) return message.channel.send(em2)
const h = new MessageEmbed()
                .setTitle( 'Success!')
                .setColor('ff0000')
                .setDescription(`I have added the tag \`${command}\` with a reply of \`${reply}\``)

        db.set(`tag_${message.guild.id}_${command}`, reply)
        await message.channel.send(h)
        
        }
        else if(args[0] === 'remove'){
        let tag = args[1]
        const hello = new MessageEmbed()
                .setTitle('Error')
                .setDescription('Please provide a tag for me to delete!')
                .setColor('ff0000')

        if(!tag) return message.channel.send(hello)
            const hello1 = new MessageEmbed()
                .setTitle('Error')
                .setDescription('No such tag exists!')
                .setColor('ff0000')
        if(db.get(`tag_${message.guild.id}_${tag}`) === null) return message.channel.send(hello1)
        
        db.delete(`tag_${message.guild.id}_${tag}`)
            const em28 = new MessageEmbed()
                .setColor('ff0000')
                .setDescription('I have deleted the tag ' + tag)

        await message.channel.send(em28)
        }
    }
}