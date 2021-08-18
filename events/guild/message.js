const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("ms");
const PrefixS = require("../../models/guild");
const schema = require(`../../models/chatbot`);
const moment = require("moment");
const { MessageEmbed } = require(`discord.js`);
const cooldowns = new Map();
const axios = require("axios");
const chalk = require("chalk");
const countDb = require('../../models/counting')
require("../../lineReply");

module.exports = async (client, message) => {
  if (message.author.bot) return;
  if (message.channel.type == "dm") return;
  let data;
  
  try {
    data = await PrefixS.findOne({
      guildID: message.guild.id,
    });
  } catch (e) {
    throw e;
  }
let pdb = await db.fetch(`prefix_${message.guild.id}`)
  
        let prefix;
        let mentionRegex = message.content.match(new RegExp(`^<@!?(${client.user.id})>`, 'gi'))
        if (mentionRegex) {
            prefix = `${mentionRegex[0]} `
        } else {
            if(pdb === null) {
            prefix = '!'
            } else{
                prefix = pdb
            }
        }
  {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();

    if (db.get(`tag_${message.guild.id}_${cmd}`) !== null)
      message.channel.send(db.get(`tag_${message.guild.id}_${cmd}`));

    const command =
      client.commands.get(cmd) ||
      client.commands.find((c) => c.aliases && c.aliases.includes(cmd));

    if (!command) return;

    if (!cooldowns.has(command.name)) {
      cooldowns.set(command.name, new Discord.Collection());
    }

    const current_time = Date.now();
    const time_stamps = cooldowns.get(command.name);
    const cooldown_amount = command.cooldown * 1000;

    if (time_stamps.has(message.author.id)) {
      const expiration_time =
        time_stamps.get(message.author.id) + cooldown_amount;

      if (current_time < expiration_time) {
        const time_left = (expiration_time - current_time) / 1000;

        function msToTime(ms) {
          days = Math.floor(ms / 86400000);
          daysms = ms % 86400000;
          hours = Math.floor(daysms / 3600000);
          hoursms = ms % 3600000;
          minutes = Math.floor(hoursms / 60000);
          minutesms = ms % 60000;
          sec = Math.floor(minutesms / 1000);

          let str = "";
          if (days) str = str + days + " days, ";
          if (hours) str = str + hours + " hours, ";
          if (minutes) str = str + minutes + " minutes, ";
          if (sec) str = str + sec + " seconds";

          return str;
        }

        const embed = new Discord.MessageEmbed()
          .setTitle(
            `please wait \`${time_left.toFixed(
              1
            )}\` more seconds before using this again`
          )
          .setColor("#ff0000");

        return message.channel.send(embed);
      }
    }

    time_stamps.set(message.author.id, current_time);
    setTimeout(() => time_stamps.delete(message.author.id), cooldown_amount);

    const channell = db.get(`cmdlogs_${message.guild.id}`);

    const channel = message.guild.channels.cache.get(channell);

    try {
      if (command) command.run(client, message, args, Discord);
      console.log(
        chalk.red(
          `${message.author.tag} ran ${command.name} in ${message.guild.name}`
        )
      );

      if (!channel) return;

      const embedddd = new Discord.MessageEmbed()
        .setDescription(
          `**${cmd}** command was used by **${message.author.tag}** in <#${message.channel.id}>`
        )
        .setTimestamp()
        .setColor("#ff0000");
    } catch (err) {
      console.log(err);
    }
  }
};