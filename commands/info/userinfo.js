const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const { Client, Intents } = require('discord.js');
const moment = require('moment');
const fetch = require('node-fetch')


module.exports = {
  name: 'userinfo',
  aliases: ['ui', 'user', 'userstats'],
  description: 'gives info on a user',
   async run(client, message, args) {
  let potato =  message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

//  const flags = potato.user.flags.toArray()


  const createdate = new Date(potato.user.createdAt).toLocaleDateString('en-US')
  const joinedate = new Date(potato.joinedAt).toLocaleDateString('en-US')

 await message.guild.members.fetch()
  let status;
  switch (potato.presence.status) {
    case "online":
       status = "🟢online";
       break;
    case "dnd":
       status = "⛔dnd";
       break;
    case "idle":
       status = "🟠idle";
       break;
    case "offline":
       status = "<:offline:870678272411848736>offline";
       break;
  }

  const embed = new MessageEmbed()
       .setTitle(`**User info:**`)
       .setColor(`#ff0000`)
       .setThumbnail(potato.user.displayAvatarURL({ dynamic: true}))
       .setFooter(`ID: ${potato.user.id}   Requested by: ${message.member.displayName}`)
       .addFields(
           {
               name: "Name: ",
               value: potato.user.tag,
               inline: true
         },
         {
           name: "Current Status: ",
           value: status,
           inline: true
         },
         {
           name: "Currently playing: ",
           value: potato.user.presence.activities.name || "N/A"
         },
         {
           name: "Account Created: ",
           value: createdate,
           inline: true
         },
         {
           name: "Joined Server at: ",
           value: joinedate,
           inline: true
         },
         /*
         {
           name: "Flags: ",
           value: flags,
           inline: true
         },
         */
         {
           name: "User's roles: ",
           value: potato.roles.cache.map(role => role.toString()).join(",")
         }
       )

  	let uid = potato.user.id
		let response = fetch(`https://discord.com/api/v8/users/${uid}`, {
			method: 'GET',
			headers: {
				Authorization: `Bot ${process.env.DISCORD_TOKEN}`
			}
		});
		let receive = '';
		let banner =
			'https://cdn.discordapp.com/attachments/829722741288337428/834016013678673950/banner_invisible.gif';
		response
			.then(a => {
				if (a.status !== 404) {
					a.json().then(data => {
						receive = data['banner'];
						if (receive !== null) {
							let response2 = fetch(
								`https://cdn.discordapp.com/banners/${uid}/${receive}.gif`,
								{
									method: 'GET',
									headers: {
										Authorization: `Bot ${process.env.DISCORD_TOKEN}`
									}
								}
							);
							let statut = '';
							response2.then(b => {
								statut = b.status;
								banner = `https://cdn.discordapp.com/banners/${uid}/${receive}.gif?size=1024`;
								if (statut === 415) {
									banner = `https://cdn.discordapp.com/banners/${uid}/${receive}.png?size=1024`;
								}
							});
						}
					});
				}
			})

     setTimeout(() => {
       embed.setImage(banner, {size: 1024})
       message.channel.send(embed)
     }, 1000) 
   
  }
  }
  
  