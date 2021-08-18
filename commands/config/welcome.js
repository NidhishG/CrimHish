const db = require('quick.db')

module.exports = {
  name: 'welcome',
  aliases: ['setup-welcome'],
  description: 'set welcome system in your server',
  run: async(client, message, args) => {
    if(!args[0]) return message.reply('You did not mention what you want to do. `!welcome channel`, `!welcome message` or `!welcome picture`. Before doing message or picture, you have to do channel. You can do picture and message if you wish. To disable welcome, do `!welcome disable.`')

    const channel = message.mentions.channels.first()

    if(args[0] === 'channel') {
      if(!channel) return message.reply('You did not mention a channel to set welcome in.')
      await db.set(`welcomechan_${message.guild.id}`, channel.id)
      message.channel.send(`Welcome channel has been set to ${channel}`)
    } else if(args[0] === 'message') {
            const c = await db.fetch(`welcomechan_${message.guild.id}`)
      if(c === null) return message.reply('You need to enable the welcome channel first')

      const msg = args.slice(1).join(" ")
      if(!msg) return message.reply('Please add the message. Example: `!welcome message Welcome to the server!`')
      await db.set(`welcomemsg_${message.guild.id}`, msg)
      message.channel.send('I have set the welcome message!')
    } else if(args[0] === 'picture') {
      const c = await db.fetch(`welcomechan_${message.guild.id}`)
      if(c === null) return message.reply('You need to enable the welcome channel first')

      if(!args[1]) return message.channel.send('You did not mention `!welcome picture off` or `!welcome picture on`')
      if(args[1] === 'on'){
        await db.set(`welcomepic_${message.guild.id}`, 1)
        message.channel.send('I have enabled welcome picture!')
      } else if(args[1] === 'off'){
         db.delete(`welcomepic_${message.guild.id}`)
        message.channel.send('I have disabled welcome picture.')
      } 

    } else if(args[0] === 'disable'){
      if(!db.get(`welcomechan_${message.guild.id}`) === null) return message.reply('There is no welcome setup.')
      db.delete(`welcomechan_${message.guild.id}`)

      db.delete(`welcomepic_${message.guild.id}`)
       
      db.delete(`welcomemsg_${message.guild.id}`)
      message.channel.send('I have deleted the welcome.')
       
    }
  }
}