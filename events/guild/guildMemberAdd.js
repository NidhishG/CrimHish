  const { MessageEmbed, MessageAttachment } = require('discord.js')
const db = require('quick.db')
const Canvas = require("canvas-senpai")
const axios = require('axios')

module.exports = async(client, member) => {

const chan = await db.fetch(`welcomechan_${member.guild.id}`)
const message = await db.fetch(`welcomemsg_${member.guild.id}`)
if(chan === null) return
const pic = await db.fetch(`welcomepic_${member.guild.id}`)
if(chan === null) return
  const channel = client.channels.cache.get(chan)
  channel.send(`${member}, ${message}`)
}