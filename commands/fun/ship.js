const block = "⬛";
const heart = ":red_square:";
const { MessageEmbed } = require(`discord.js`)

module.exports = {
  name: 'ship',
  aliases: [],
  cooldown: 5,
  description: 'ship a user :flushed:',
  async run(client, message, args){
      const discord = require('discord.js')
const Canvas = require('canvas')


    const canvas = Canvas.createCanvas(700, 250)
    const ctx = canvas.getContext("2d")

    const target = message.mentions.users.first()
    if(!target) return message.channel.send("Please mention someone")
    if(target.id == message.author.id) return message.channel.send("Please mention someone else")

    const bg = await Canvas.loadImage("https://cdn.discordapp.com/attachments/716216765448978504/858442843197669376/PElrfiWeuvQ.png")
    ctx.drawImage(bg, 0, 0, canvas.width, canvas.height)

    const avatar = await Canvas.loadImage(message.author.displayAvatarURL( { format: 'png' } ))
    ctx.drawImage(avatar, 100, 25, 200, 200)

    const TargetAvatar = await Canvas.loadImage(target.displayAvatarURL( { format: "png" } ))
    ctx.drawImage(TargetAvatar, 400, 25, 200, 200)


    const heart = await Canvas.loadImage('https://cdn.discordapp.com/attachments/716216765448978504/858607217728159744/unknown.png')
    const broken = await Canvas.loadImage('https://cdn.discordapp.com/attachments/716216765448978504/858607537238179840/unknown.png')
    const random = Math.floor(Math.random() * 99) + 1

    if(random >= 50) {
        ctx.drawImage(heart, 275, 60, 150, 150)
        const attachment = new discord.MessageAttachment(canvas.toBuffer(), 'love.png')
        const embed = new discord.MessageEmbed()
        .addField(`Ship Meter`,`${ship()}`)
       // .attachFiles(attachment)
        .setImage(`attachment://love.png`)
        .setColor("00ff00")
        return message.channel.send(embed, attachment)

    } else {
        ctx.drawImage(broken, 275, 60, 150, 150)
        const attachment = new discord.MessageAttachment(canvas.toBuffer(), 'broken.png')
        const embed = new discord.MessageEmbed()
        .addField(`Ship Meter`,`${ship()}`)
       // .attachFiles(attachment)
        .setImage(`attachment://broken.png`)
        .setColor("ff0000")
        return message.channel.send(embed, attachment)

    }





  }
}
function ship() {
    const hearts = Math.floor(Math.random() * 100) + 0;
    const hearte = (hearts/10)
  
    const str = `${heart.repeat(hearte)}${block.repeat(10 - hearte)} ${hearts}%`;
    return str;
}
