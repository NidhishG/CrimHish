const ms = require("ms");
const giveaway = {}

module.exports = {
    name: "gstart",
    aliases: ["gcreate"],
    description: "Quickstart a giveaway!",
    usage: "!gstart <channel> <time> <winners> <prize>",
  run: async (client, message, args) => {
    // If the member doesn't have enough permissions
    if (!message.member.permissions.has("MANAGE_MESSAGES")) {
      return message.reply(
        "You do not have permissions to use this command. - [MANAGE_MESSAGES]"
      );
    }
        const filter = m => m.author.id === message.author.id;
    const collector = message.channel.createMessageCollector(filter, { max: 7, time: 60 * 1000 });
    let step = 0;

    message.channel.send('What is the prize?');
    collector.on('collect', async (msg) => {
        if (!msg.content) return collector.stop('error');

        step++;
        if (step == 1) {
            const prize = msg.content;
            message.channel.send(`The prize is **${prize}**! Which channel do you want to host in?`, { allowedMentions: { roles: [], users: [], parse: [] } });
            giveaway.prize = prize;
        }
        else if (step == 2) {
            const channel = msg.mentions.channels.first() || msg.guild.channels.cache.get(msg.content);
            if (!channel) return collector.stop('error');
            giveaway.channel = channel;
            message.channel.send(`Channel is <#${channel.id}>! Now how many winners do you want?`);
        }
        else if (step == 3) {
            const winners = msg.content;
            if (isNaN(winners)) return collector.stop('error');
            if (parseInt(winners) > 10) {
                message.reply('You cannot have more than 10 winners!');
                return collector.stop('error');
            }
            giveaway.winners = parseInt(winners);
            message.channel.send(`${winners} winner(s) will be chosen for this giveaway! How much time do you want?`);
        }
        else if (step == 4) {
            const time = parseInt(ms(msg.content));
            if (!ms(time)) return collector.stop('error');
            giveaway.time = time
            if (ms(giveaway.time) > ms('14d')) return collector.stop('HIGH_TIME');
            message.channel.send(`The time is now set to ${ms(time)}! Who is hosting the giveaway?`);
        }
        else if (step == 5) {
            const host = msg.mentions.users.first() || msg.guild.members.cache.get(msg.content) || message.member;

            giveaway.host = host.id;
            message.channel.send(`The host is ${host}, Is this correct?\n\`\`\`Prize: ${giveaway.prize}\nWinner(s): ${giveaway.winners}\nTime: ${ms(giveaway.time)}\nhost: ${message.guild.members.cache.get(giveaway.host).user.username}\n\`\`\`Reply with \`yes\` or \`no\`!`);
        }
     
        else if (step == 6) {
            if (!['yes', 'no'].includes(msg.content)) return collector.stop('error');
            if (msg.content == 'yes') return collector.stop('done');
            if (msg.content == 'no') return collector.stop('cancel');
        }

    });

    collector.on('end', async (msgs, reason) => {
        if (reason == 'time') return message.channel.send('You did not reply in time!');
        if (reason == 'error') return message.channel.send('You did not provide valid option!');
        if (reason == 'cancel') return message.channel.send('Cancelled giveaway setup due to wrong info!');
        if (reason == 'HIGH_TIME') return message.channel.send('The time cannot be more than 14 days!');
        message.channel.send(`Giveaway started in ${giveaway.channel}`)
    client.giveawaysManager.start(giveaway.channel, {
      time: giveaway.time,
      prize: giveaway.prize,
      winnerCount: giveaway.winners,
      hostedBy: giveaway.host,
      messages: {
        giveaway:
          (client.config.everyoneMention ? "@everyone\n\n" : "") +
          client.config.giveawayEmoji +
          "** GIVEAWAY **" +
          client.config.giveawayEmoji,
        giveawayEnded:
          (client.config.everyoneMention ? "@everyone\n\n" : "") +
          client.config.giveawayEmoji +
          "** GIVEAWAY ENDED **" +
          client.config.giveawayEmoji,
        timeRemaining: "Time: **{duration}**!",
        inviteToParticipate:
          "React with " + client.config.reaction + " to participate!",
        winMessage:
          client.config.giveawayEmoji +
          " {winners} has won the giveaway for **{prize}**!\n{messageURL}",
        embedFooter: client.config.botName,
        noWinner: "Winner(s): Could not determine a winner.",
        hostedBy: giveaway.host,
        winners: "winner(s)",
        endedAt: "Ended at",
        units: {
          seconds: "seconds",
          minutes: "minutes",
          hours: "hours",
          days: "days",
        }
      }
    });

     
    });


  }
};
