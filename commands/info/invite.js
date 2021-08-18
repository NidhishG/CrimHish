const { MessageButton, MessageActionRow } = require('discord-buttons')

module.exports = {
  name: 'invite',
  description: 'get invites for the bot',
  async run(client, message, args){
    const topgg = new MessageButton()
    .setLabel('Top.gg')
    .setStyle('url')
    .setURL('https://top.gg/bot/870033262700019712')

     const topgg1 = new MessageButton()
    .setLabel('Top.gg Vote')
    .setStyle('url')
    .setURL('https://top.gg/bot/870033262700019712/vote') 

     const invite = new MessageButton()
    .setLabel('Bot Invite')
    .setStyle('url')
    .setURL('https://discord.com/oauth2/authorize?client_id=870033262700019712&scope=bot&permissions=2147483647')
     
     const support = new MessageButton()
    .setLabel('Support Server')
    .setStyle('url')
    .setURL('https://discord.gg/sZma7vMDK9')

     
 
    let row = new MessageActionRow().addComponents(invite, support, topgg, topgg1)
    message.channel.send('These are my main links.', row)

  }
}