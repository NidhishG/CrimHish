const { MessageEmbed } = require('discord.js')
const Profile = require('../../models/profile')

module.exports = {
  name: 'rankrole',
  aliases: ["rankroles"],
  cooldown: 5,
  description: 'Adds a role to a user when they reach a specific rank.',
  usage: 'add/remove (role) (level)',
  
  run: async(client, message, args) => {
    let data;
      try {
    data = await Profile.findOne({
      guildID: message.guild.id,
    })
    if(!data) {
      data = await Profile.create({
        guildID: message.guild.id,
      })
    }
  } catch(e) {
    console.log(e)
  }
  
    const roletoadd = message.mentions.roles.first()
    let level = args[2];
    
    if(args[0] == "add") {
      if(!args[1]) {
        message.channel.send('add wut buddy...')
      }
    if(isNaN(args[2])) {
      message.channel.send('it has to be a number.')
    }
    
              Profile.findOne({ guildID: message.guild.id, userID: message.author.id}, async (err, data) => {
      if(err) throw err;
      if(!data) {
         data = new Profile({
           guildID: message.guild.id,
           rankrole: [
            {
             rankrole: args[1],
             level: args[2],
            }
           ]
         })
      } else {
        const obj = {
         rankrole: args[1],
         level: args[2]
        }
        data.rankrole.push(obj)
      };
      data.save()
    });
    message.channel.send(`${roletoadd} will now be given to users when they reach ${level}`)
    }
    if(args[0] == "remove") {
      Profile.findOne({ guildID: message.guild.id, userID: message.author.id }, async(err,data) => {
      if(err) throw err;
      if(data) {
        if(!args[1]) return message.channel.send(new MessageEmbed()
        .setColor("RED")
        .setTitle(`:x: **Error**`)
        .setDescription(`Provide a number for me to remove or use all to remove all.`)
        )
        let number = parseInt(args[1]) - 1
        data.rankrole.splice(number, 1)
        message.channel.send(new MessageEmbed()
        .setTitle(`**Complete!**`)
        .setDescription(`Removed the role number ${args[1]}!`)
        .setColor("GREEN")
        );
        if(args[1] == "all") {
        data.rankrole.splice(data.rankrole.size)
          message.channel.send( );
        }
        data.save()
      } else {
        message.channel.send(new MessageEmbed()
        .setTitle(`:x: **Error**`)
        .setDescription(`There are no roles`)
        .setColor("RED")
        );
      }
    })
    }
    if(!args[0]) {
      Profile.findOne( { guildID: message.guild.id, userID: message.author.id}, async (err, data) => {
      if(err) throw err;
      if(data) {
        message.channel.send(new MessageEmbed()
        .setTitle(`**${message.guild}'s Rankroles: **`)
        .setDescription(
          data.rankrole.map(
            (w, i) => 
            `\`${i + 1}\` ${w.rankrole} - level [${w.level}]\n` || `null`
          )
        )
        .setColor("BLUE")
         );
         data.save()
      } else {
        await message.channel.send(new MessageEmbed()
        .setTitle(`:x: **Error**`)
        .setDescription(`**Server has no rankroles!**`)
        .setColor("RED")
        );
      }
      
    });
    }
  }
}