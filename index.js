const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js')
const config = require('./config')
const schema = require('./models/chatbot')
const fetch = require('node-fetch')
const antiinvs = require('./models/antiinvite')
const client = new Discord.Client({
ws: { intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_MEMBERS', 'GUILD_PRESENCES'] }
  })
const Profile = require('./models/profile')
const axios = require('axios')
require('discord-buttons')(client)
require('discord-reply')
const simplydjs = require('simply-djs')
const db = require('quick.db')
const path = require('path')
const mongoose = require('mongoose')
const keepAlive = require('./server')
const Nuggies = require('nuggies')
const Levels = require('discord-xp')
const { DiscordTogether } = require('discord-together');
client.discordTogether = new DiscordTogether(client);
const L = require('./models/levelling')
const random = require('random')
require('./lineReply')
Levels.setURL(process.env.mongoURI)
client.config = require('./config')
client.commands = new Discord.Collection();
client.snipes = new Discord.Collection();
client.aliases = new Discord.Collection();
module.exports = client; 
['command_handler', 'event_handler'].forEach((handler) => {
  require(path.resolve(`handlers/${handler}`))(client)
})

mongoose.connect(process.env.mongoURI, {
  useFindAndModify: false,
  useUnifiedTopology: true,
  useNewUrlParser: true
}).then(console.log('connected to mongoDB'))

Nuggies.handleInteractions(client)
Nuggies.connect(process.env.mongoURI)

client.on('clickButton', async(button) => { 
   simplydjs.clickBtn(button, {
    embedDesc: 'Welcome to your ticket!',
    embedColor: 'ff0000',
    closeColor: 'red', 
    closeEmoji: '🔒', 
    delColor: 'gray', 
    delEmoji: '❌', 
    openColor: 'green',
    openEmoji: '🔓'
    })
})

client.on('message', async message =>{
  if(message.author.bot) return
L.findOne({guildID: message.guild.id}, async(err, data) => {
  if(err) throw err;
  if(data) {
if(data.life === true) {
Profile.findOne(
           {
             guildID: message.guild.id,
             userID: message.author.id,
           }, async (err, data) => {
             if(err) console.log(err);
             if(!data) {
               Profile.insertMany({
                 guildID: message.guild.id,
                 userID: message.author.id,
                 level: 0,
                 xp: 15,
                 last_message: 60000,
                 total_xp: 15,
               });
             } else {
                if(Date.now() - data.last_message > 10000) {
                 let randomXP = random.int(5, 12);
                 data.xp += randomXP;
                 data.total_xp += randomXP;
                 data.last_message = Date.now();
                 const xpToNext = data.level * data.level * 100
               //const xpToNext = data.level * data.level * 100

                 if(data.xp >= xpToNext) {
              data.level++;
            data.xp = data.xp - xpToNext

               message.channel.send(new MessageEmbed()
                   .setTitle(`Level Up!`)
                   .setDescription(`Congrats ${message.author} you are now level ${data.level}`)
                   .setColor("ff0000")
                   );
     
      
                 }       
                }
            let rolerank = data.rankrole; 
    for (var i in rolerank) {
     if(rolerank[i].level == data.level) {
  const potato = rolerank[i].rankrole.slice(0, -1)
  const potato2 = potato.slice(3)
  if(message.member.roles.cache.find(r => r.id == potato2)) {
  continue;
} else {
message.member.roles.add(potato2).then(message.channel.send(new MessageEmbed()
.setTitle(`Congrats! ${message.author.tag}`)
.setDescription(`You received ${rolerank[i].rankrole} for reaching level ${rolerank[i].level}!`)
))
}


}
}
     data.save().catch((err) => console.log(err));
          }
           }
           );
      
  
} else return;
} else return;
})
})

//chatbot
client.on('message', async message =>{
   const chatbothas = await schema.findOne({ _id: message.guild.id })
    if (!chatbothas) {
      return;
    } else {
      schema.findOne({
        _id: message.guild.id
      }, async (err, data) => {
        if (err) throw err;
        const channel = message.guild.channels.cache.get(data.channel);
        if (message.channel.id !== channel.id) {
          return;
        } else {
            if(message.author.bot) return
            const body = await axios.get(`https://api.affiliateplus.xyz/api/chatbot?message=${message.content}&botname=CrimHish&ownername=Crimson,Nidhish,Cuber,Vlad&user=1`) 

            const res = body.data
            message.lineReply(`${res.message}`)
              const requests = data.count
          data.count = requests + 1
          data.save();
        }
      })
    }
})
client.on('message', async message => {
     const invhas = await antiinvs.findOne({ guild: message.guild.id })
if (!invhas) {
  return;
} else{
  const chan = await db.fetch(`antiinvchannel_${message.guild.id}`) 
        antiinvs.findOne({
    guild: message.guild.id
  }, async (err, data) => {
    if (err) throw err;
let link = ["discord.gg", "discord.com/invite", '.gg/', 'discord.gg/', 'discord.app']
if(message.channel.id === chan) return
if(link.some(word => message.content.toLowerCase().includes(word))) {
await message.delete();
return message.reply('You are not allowed to send invite links')
.then(m => m.delete({timeout: 10000}))
}
}
)}

})

client.on('message', async message =>{
    if(db.has(`afk_${message.author.id}_${message.guild.id}`)) {
        const oldReason = db.get(`afk_${message.author.id}_${message.guild.id}`)
        await db.delete(`afk_${message.author.id}_${message.guild.id}`)
        message.channel.send(`I have removed your afk for \`${oldReason}\``)
    }
    if(message.mentions.members.first()) {
        if(db.has(`afk_${message.mentions.members.first().id}_${message.guild.id}`)) {
            const lolreason = db.get(`afk_${message.mentions.members.first().id}_${message.guild.id}`)

            message.channel.send(`${message.mentions.members.first().user.tag} is afk for \`${lolreason}\`` )
        }
     }
})

//guild join logs
client.on('guildCreate', async guild => {
  const channel = client.channels.cache.get('872865710324469781')
  if(!channel) return
  const embed = new Discord.MessageEmbed()
  .setColor('ff0000')
  .setTitle('New Guild')
  .addField('Name', guild.name)
  .addField('ID', guild.id)
  .addField('Member Count', `\`${guild.memberCount}\``)
  channel.send(embed)
})
client.on('guildRemove', async guild => {
  const channel = client.channels.cache.get('872865710324469781')
  if(!channel) return
  const embed = new Discord.MessageEmbed()
  .setColor('ff0000')
  .setTitle('Guild Remove')
  .addField('Name', guild.name)
  .addField('ID', guild.id)
  .addField('Member Count', `\`${guild.memberCount}\``)
  channel.send(embed)
})

//Giveaway
const { GiveawaysManager } = require("discord-giveaways");
client.giveawaysManager = new GiveawaysManager(client, {
  storage: "./giveaways.json",
  updateCountdownEvery: 5000,
  default: {
    botsCanWin: false,
    embedColor: 'ff0000',
    embedColorEnd: 'GREEN',
    reaction: '🎉'
  }
});

client.giveawaysManager.on(
  "giveawayReactionAdded",
  (giveaway, member, reaction) => {
    if (member.id !== client.user.id) {
      console.log(
        `${member.user.tag} entered giveaway #${giveaway.messageID} (${reaction.emoji.name})`
      );
    }
  }
);

client.giveawaysManager.on(
  "giveawayReactionRemoved",
  (giveaway, member, reaction) => {
    if (member.id !== client.user.id) {
      console.log(
        `${member.user.tag} left giveaway #${giveaway.messageID} (${reaction.emoji.name})`
      );
    }
  }
);

client.on('message', async message => {
    const countDB = require("./models/counting");

  countDB.findOne({ guild: message
  .guild.id }, async(err, count) => {
    if(count) {
    if(count.channel && message.channel.id == count.channel) {
      if(count.lastPerson == message.author.id || parseInt(message.content) !== count.amount + 1) message.delete()
      message.react('✅')
   count.amount = parseInt(message.content);
   count.lastPerson = message.author.id;
      count.save();
    } else {
      return;
    } 
    } else {
      return;
    }
  })


})

client.on('guildMemberAdd', async member => {
  const chan = await db.fetch(`welcomechan_${member.guild.id}`)
  const pic = await db.fetch(`welcomepic_${member.guild.id}`)
  if(pic === null) return
      let background;
    let backgrounds = db.fetch(`background_${member.guild.id}`)
    if(backgrounds == null) {
        background = 'https://cdn.discordapp.com/attachments/819284150791176232/825290048659914782/abstract-dotted-banner-background_1035-18160.png'
    } else {
        background = backgrounds
    }
    const avatar = member.user.displayAvatarURL({dynamic: false})
    const title = member.user.username
    const Member12 = member.guild.memberCount
    const sub = `Member ${Member12}`
    const color = '8015EA'
    const res = await fetch(`https://frenchnoodles.xyz/api/endpoints/welcomebanner?background=${background}&avatar=${avatar}&title=${title}&subtitle=${sub}&textcolor=${color}`, {
        headers: {
            'APIKEY': 'f8xftlruivhjdRn85zYJoSxBrDcDj2Pxu0Loa8'
        }
    })


        const channel =  member.guild.channels.cache.get(chan)
        let Image = await res.buffer()
        const img = new Discord.MessageAttachment(Image)
        channel.send(`Welcome to the server ${member}`, img)

            const countDB = require("./models/autorole");

  countDB.findOne({ guild: member
  .guild.id }, async(err, data) => {
    if(data) {
         let role = member.guild.roles.cache.find(r => r.id === data.role);

      member.roles.add(role)
    }
  })


})

//keepAlive()
client.login(process.env.token)