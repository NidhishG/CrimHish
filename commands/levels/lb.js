const Discord = require("discord.js")
const { MessageEmbed } = require('discord.js')
const random = require('random')
const Profile = require('../../models/profile')
const canvacord = require('canvacord')

module.exports = {
   name: 'leaderboard',
  aliases: ["lb"],
  description: "Sends the server's leaderboard",
  usage: " ",

  
  run: async(client, message, args) => {
    Profile.find({
      guildID: message.guild.id,
    }).sort([["level", "descending"]]).exec(async (err, res) => {
      if(err) return console.log(err)

      if(!res.length) return message.channel.send(new MessageEmbed()
      .setTitle(`:x: Noone has xp in this server`)
      )

     let i = 0; i < res.length; i++;
         
      const embed = new MessageEmbed()
      .setAuthor(`${message.guild}'s Leaderboard`)
      for(let i=0 ; i < res.length; i++){
        try{
        const user = await message.guild.members.fetch(res[i].userID)
        if (i === 9) {
          embed.description += `**#${i + 1}** **|** __${user.user}__ Level: **${res[i].level}** **|** XP: **${res[i].xp}\n`;
          break;
        } else {
          embed.description += `**#${i + 1}** **|** __${user.user}__ Level: **${res[i].level}** **|** XP: **${res[i].xp}\n`;
        }
        } catch (err) {
          console.log(err)
        }
      }
      message.channel.send(embed)
      });
  
  }
}