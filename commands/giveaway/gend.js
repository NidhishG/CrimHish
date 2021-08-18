const ms = require("ms");

module.exports = {
    name: "gend",
    aliases: [],
    description: "Ends a giveaway!",
  
  run: async (client, message, args) => {
    // If the member doesn't have enough permissions
    if (!message.member.hasPermission("MANAGE_MESSAGES")) {
      return message.reply(
        "You do not have permissions to use this command. - [MANAGE_MESSAGES]"
      );
    }

    // If no message ID or giveaway name is specified
    if (!args[0]) {
      return message.channel.send(
        ":x: You have to specify a valid message ID!"
      );
    }

    // try to found the giveaway with prize then with ID
    let giveaway =
      // Search with giveaway prize
      client.giveawaysManager.giveaways.find(g => g.prize === args.join(" ")) ||
      // Search with giveaway ID
      client.giveawaysManager.giveaways.find(g => g.messageID === args[0]);

    // If no giveaway was found
    if (!giveaway) {
      return message.channel.send(
        ":x: Unable to find a giveaway for `" + args.join(" ") + "`."
      );
    }

    // Edit the giveaway
    client.giveawaysManager
      .edit(giveaway.messageID, {
        setEndTimestamp: Date.now()
      })
message.channel.send('Success')
      .then(() => {
      message.channel.send(
        "✅ Giveaway will end in less than " +
          client.giveawaysManager.options.updateCountdownEvery / 1000 +
          " seconds..."
      );
    })
      .catch(e => {
        if (
          e.startsWith(
            `Giveaway with message ID ${giveaway.messageID} has already ended.`
          )
        ) {
          message.channel.send("This giveaway has already ended!");
        } else {
          console.error(e);
          message.channel.send(":x: There was an error");
        }
      });
  }
};
