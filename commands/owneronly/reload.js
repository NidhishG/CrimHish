
const chalk = require("chalk");
const {
    MessageEmbed
} = require("discord.js");
const embed3 = new MessageEmbed()
    .setTitle(`you need to include the category of the command`)
    .setColor('#ff0000')
const embed4 = new MessageEmbed()
    .setTitle(`you need to include the name of the command`)
    .setColor('#ff0000')
module.exports = {
    name: 'reload',
    aliases: ['rl'],
    description: 'reloads <category> <command>',
    async run(client, message, args) {
         if(!["706192191198068778", "493230285278937098", '752588020057637035', '816765497097191424'].includes(message.author.id)) 
      return message.channel.send('owner only command!')
        else {
            if (!args[0]) return message.channel.send(embed3);
            if (!args[1]) return message.channel.send(embed4);

            let category = args[0];
            let command = args[1].toLowerCase();
            const embed = new MessageEmbed()
                .setTitle(`${command} command was reloaded succesfully 🟢`)
                .setColor('#ff0000')
            try {
                delete require.cache[require.resolve(`../../commands/${category}/${command}.js`)]
                client.commands.delete(command);
                const pull = require(`../../commands/${category}/${command}.js`);
                client.commands.set(command, pull);

                console.log(chalk.yellow(`> ${command} command was reloaded`));
                return message.channel.send(embed);
            } catch (error) {
                const embed2 = new MessageEmbed()
                .setTitle(`there was an error trying to reload ${command}`)
                .setDescription(`\n\`\`\`javascript\n${error.message}\n\`\`\``)
                .setColor('ff0000')
                return message.channel.send(embed2);
            }
        }
    }
}
