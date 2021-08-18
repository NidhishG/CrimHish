const ms = require("ms");

module.exports = {
    name: "greroll",
    aliases: ["gr", "reroll"],
    description: "Reroll a user that won a giveaway!",
    usage: "!reroll <message ID>",
  
  run: async (client, message, args) => {
    // If the member doesn't have enough permissions
    if (!message.member.hasPermission("MANAGE_MESSAGES")) {
      return message.reply(
        "You do not have permissions to use this command. - [MANAGE_MESSAGES]"
      );
    }
    if (!args[0]) {
      return message.channel.send(
        ":x: You have to specify a valid message ID!"
      );
    }
    let giveaway =
      client.giveawaysManager.giveaways.find(g => g.prize === args.join(" ")) ||
      client.giveawaysManager.giveaways.find(g => g.messageID === args[0]);
    if (!giveaway) {
      message.channel.send(
        ":x: No giveaway found for `${messageID}`, please check you have the right message and try again."
      );
    }

    // Reroll the giveaway
    client.giveawaysManager
      .reroll(giveaway.messageID, {
        messages: {
          congrat:
            client.config.giveawayEmoji +
            "{winners} has won the reroll for {prize}!\n{messageURL}"
        }
      })
      /*.then(() => {
      // Success message
      message.channel.send("✅ Giveaway rerolled!");
    })*/
      .catch(e => {
        if (
          e.startsWith(
            `The giveaway with message ID ${giveaway.messageID} has not ended yet.`
          )
        ) {
          message.channel.send("This giveaway has not ended!");
        } else {
          console.error(e);
          message.channel.send(":x: There was an error");
        }
      })
  }
}
