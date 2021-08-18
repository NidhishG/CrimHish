const { MessageEmbed } = require('discord.js');
const { readdirSync } = require('fs')
const { MessageButton, MessageActionRow } = require('discord-buttons');


module.exports = {
  name: 'help',
  alaises: ['h', 'hel'],
  description: 'A help command',
  
 async run(client, message, args) {
   const btn1 = new MessageButton()
   .setLabel('Invite')
   .setStyle('url')
  .setURL(`https://top.gg/bot/870033262700019712/invite`)
   const btn3 = new MessageButton()
   .setLabel('Top.gg')
   .setStyle('url')
   .setURL(`https://top.gg/bot/870033262700019712`)
        const btn2 = new MessageButton()
    .setLabel('Support Server')
    .setStyle('url')
    .setURL('https://discord.gg/sZma7vMDK9')


let row = new MessageActionRow().addComponents(btn1, btn2, btn3)

    const prefix = "!"
    const roleColor = 'ff0000'

    if (!args[0]) {
      let categories = [];

      readdirSync("./commands/").filter(f => !f.startsWith('owneronly')).forEach((dir) => {
        const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
          file.endsWith(".js")
        )

        const cmds = commands.map((command) => {
          let file = require(`../../commands/${dir}/${command}`);

          if (!file.name) return "No command name.";

          let name = file.name.replace(".js", "");
          
          return `\`${name}\``;
        });

        let data = new Object();

        data = {
          name: `》__${dir.toUpperCase()} [${cmds.length}]__`,
          value: `${cmds.join(" | ") ? cmds.join(", ") : "No commands"}`,
          inline: false
        };

        categories.push(data);
      });
      

      const embed = new MessageEmbed()
        .setTitle("These are my commands:")
        .addFields(categories)
        .setDescription(
          `Use \`${prefix}help\` followed by a comand name to get more additional information on the command! For example: **${prefix}help ping**.`
        )
        .setFooter(
          `Requested by ${message.author.tag}`,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setTimestamp()
        .setColor(roleColor);
      return message.channel.send(embed, row);
    }
     
      const command =
        client.commands.get(args[0].toLowerCase()) ||
        client.commands.find(
          (c) => c.aliases && c.aliases.includes(args[0].toLowerCase())
        );

      
if(command) {
      const embed = new MessageEmbed()
        .setTitle("Command Details:")
        .setDescription("`<>` = required\n`()` = not required")
        .addField("PREFIX:", `\`${prefix}\``)
        .addField(
          "COMMAND:",
          command.name ? `\`${command.name}\`` : "No name for this command."
        )
        .addField(
          "ALIASES:",
          command.aliases ? `\`${command.aliases}\`` : "No aliases for this command."
        )
        .addField(
          "DESCRIPTION:",
          command.description
            ? command.description
            : "No description for this command."
        )
        .setFooter(
          `Requested by ${message.author.tag}`,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setTimestamp()
        .setColor(roleColor);
      return message.channel.send(embed, row);
      
     

      
} else {
  return;
}
  }
};