const Discord = require("discord.js");

module.exports =  {
      name: "serverinfo",
      aliases: ["server-info", "server", "si"],
      description: 'gives info on a server',
    async run(client, message, args) {
    const guild = message.guild;
    const channelCache = guild.channels.cache;
    const presenceCache = guild.presences.cache;

    const online = `<:online:870678378276069467> Online : ${
      presenceCache.filter((presence) => presence.status === "online").size
    }\n`;
    const idle = `<:idle:870678624750166076> Idle: ${
      presenceCache.filter((presence) => presence.status === "idle").size
    }\n`;
    const dnd = `<:dnd:870678688432259173> Do not disturb : ${
      presenceCache.filter((presence) => presence.status === "dnd").size
    }\n`;
    const offline = `<:offline:870678272411848736> Offline: ${
      presenceCache.filter((presence) => presence.status === "offline").size
    }\n`;
    let presenceString = online + idle + dnd + offline;

    // region flag object for "guild.region" field
    const region = {
      brazil: ":flag_br: Brazil",
      "eu-central": ":flag_eu: Central Europe",
      singapore: ":flag_sg: Singapore",
      "us-central": ":flag_us: U.S. Central",
      sydney: ":flag_au: Sydney",
      "us-east": ":flag_us: U.S. East",
      "us-south": ":flag_us: U.S. South",
      "us-west": ":flag_us: U.S. West",
      "eu-west": ":flag_eu: Western Europe",
      "vip-us-east": ":flag_us: VIP U.S. East",
      london: ":flag_gb: London",
      amsterdam: ":flag_nl: Amsterdam",
      hongkong: ":flag_hk: Hong Kong",
      russia: ":flag_ru: Russia",
      southafrica: ":flag_za:  South Africa",
      europe: ":flag_eu: Europe",
    };

    // send embed with stats
    const embed = new Discord.MessageEmbed()
      .setColor("#ff0000")
      .setThumbnail(guild.iconURL({ dynamic: true }))
      .addFields(
        {
          name: `📝 Name`,
          value: guild.name,
        },
        {
          name: `👑 Owner`,
          value: guild.owner,
        },
        {
          name: `🏴󠁧󠁮󠁬󠁿 Region`,
          value: region[guild.region],
          inline: true,
        },
        {
          name: `🚀 Boosts`,
          value: `Level: ${guild.premiumTier}`,
          inline: true,
        },
        {
          name: `✅ Verification level`,
          value: `__${
            guild.verificationLevel.charAt(0).toUpperCase() +
            guild.verificationLevel.slice(1).toLowerCase()
          }__`,
          inline: true,
        },
        {
          name: `🕒 Time created`,
          value: new Date(guild.createdTimestamp).toString(),
        },
        {
          name: `👥 Member Status`,
          value: presenceString,
        },
        {
          name: `🤖 Bots`,
          value: guild.members.cache.filter(
            (member) => member.user.bot === true
          ).size,
          inline: true,
        },
        {
          name: `🔢 Boost Count`,
          value: guild.premiumSubscriptionCount,
          inline: true,
        },
        {
          name: `📜 Roles`,
          value: guild.roles.cache.filter((role) => role.name != "@everyone")
            .size,
          inline: true,
        },
        {
          name: `😊 Emoji Count`,
          value: guild.emojis.cache.size,
        },
        {
          name: `📁 Categories`,
          value: channelCache.filter((channel) => channel.type === "category")
            .size,
          inline: true,
        },
        {
          name: `💬 Text Channels`,
          value: channelCache.filter((channel) => channel.type === "text").size,
          inline: true,
        },
        {
          name: `📣 Voice Channels`,
          value: channelCache.filter((channel) => channel.type === "voice")
            .size,
          inline: true,
        }
      )
      .setFooter(
       `Do !help for a list of commands.`,
        client.user.displayAvatarURL({ dynamic: true })
      )
      .setTimestamp();
    message.reply(embed);
  }
};
