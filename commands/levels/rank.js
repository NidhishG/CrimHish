const Levels = require('discord-xp')
const canvacord = require("canvacord");
const Discord = require('discord.js')
const { MessageEmbed } = require('discord.js')
const random = require('random')
const Profile = require('../../models/profile')

module.exports = {
  name: 'rank',
  aliases: ['level'],
  description: 'shows your rank in the server',
  async run(client, message, args){
Profile.find({
 guildID: message.guild.id,
 }).sort([["total_xp", "descending"]])
 .exec(async (err, res) => {
 if (err) return console.log(err);

if (!res.length) 
 return message.channel.send("lol no result of xp found you gotta type to get a rank bud")
const user = message.mentions.users.first();
 if (!user) {
for (let i = 0; i < res.length; i++) {
 if (res[i].userID != message.author.id) {
 if (i >= res.length - 1) {
return;
 } else {
                continue;
              }
            } else {
              const xpToNext = res[i].level * res[i].level * 100
              const rankCard = new canvacord.Rank()
                .setAvatar(message.author.displayAvatarURL({ format: "png" }))
                .setRequiredXP(xpToNext)
                .setCurrentXP(res[i].xp)
                .setLevel(res[i].level)
                .setUsername(message.author.username)
                .setRank(i + 1)
                .setProgressBar("#0000FF", "COLOR")
                .setBackground("IMAGE", "https://www.creativefabrica.com/wp-content/uploads/2020/01/13/geometric-red-background-black-Graphics-1-1-580x387.jpg")
                .setDiscriminator(message.author.discriminator);
              rankCard.build().then((data) => {
                const attachment = new Discord.MessageAttachment(
                  data,
                  "rankcard.png"
                );
                
                message.channel.send(attachment);
              });
            }
          }
        } else {
          for (let i = 0; i < res.length; i++) {
            if (res[i].userID != user.id) {
              if (i >= res.length - 1) {
                return;
              } else {
                continue;
              }
            } else {
              const xpToNext = res[i].level * res[i].level * 100;
              const rankCard = new canvacord.Rank()
                .setAvatar(user.displayAvatarURL({ format: "png" }))
.setRequiredXP(xpToNext)
.setCurrentXP(res[i].xp)
 .setLevel(res[i].level)
 .setUsername(user.username)
                .setRank(i + 1)
                .setProgressBar("#0000FF", "COLOR")
                .setDiscriminator(user.discriminator)
                .setBackground("IMAGE", "https://www.creativefabrica.com/wp-content/uploads/2020/01/13/geometric-red-background-black-Graphics-1-1-580x387.jpg")
              rankCard.build().then((data) => {
                const attachment = new Discord.MessageAttachment(
                  data,
                  "rankcard.png"
                );
                message.channel.send(attachment);
              });
            }
          }
          
        }
})
  }
}