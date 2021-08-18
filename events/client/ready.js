const Discord = require('discord.js')
const axios = require('axios')
module.exports = async (client) => {
   const prefix = '!'
    const chalk = require('chalk')
    console.log(chalk.green(`${client.user.tag} is online`));
        let totalUsers = client.guilds.cache.reduce((acc, value) => acc + value.memberCount, 0)
   //   var activities = [ `${client.guilds.cache.size} servers`, `${totalUsers} users!` ], i = 0;
    const status = [
    {
      name: ` ${prefix}help | ${client.guilds.cache.size} servers`,
      type: "Watching"
    },
    {
      name: `${totalUsers} Users!`,
      type: "WATCHING"
    },
    {
      name: `CrimHish ✅`,
      type: "WATCHING"
    },

  ];
  let i = 0;

  setInterval(function() {
    const toDisplay = status[parseInt(i, 10)];
    client.user.setActivity(toDisplay, { type: status[parseInt(i, 10)].type });
    if (status[parseInt(i + 1, 10)]) i++;
    else i = 0;
  }, 4000);

  
  }