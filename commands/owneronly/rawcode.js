const sourcebin = require('sourcebin')
const fs = require('fs')
const { readdirSync } = require('fs')

module.exports = {
  name: 'rawcode',
  aliases: [' '],
  description: 'Sends raw code of a command. Owner Only!',
  usage: "(code)",
  async run(client, message, args) {
         if(!["706192191198068778", "493230285278937098", '752588020057637035', '816765497097191424'].includes(message.author.id)) 
      return message.channel.send('owner only command!')
 const commandsFldr = readdirSync("./commands/");
  for (const dir of commandsFldr) {
      try {
        const data = await fs.promises.readFile(`./commands/${dir}/${args}.js`);

        if (typeof data === "undefined") return;
        const bin = await sourcebin.create(
          [{ content: `${data.toString()}`, language: "js" }],
          { title: `${args}.js`, description: " " }
        );
        await message.channel.send(bin.url);
        break;
      } catch (err) {
        continue;
      }
    
  }
    const eventsFldr = readdirSync("./events/");
    for(const dir of eventsFldr) {
      try {
        const data = await fs.promises.readFile(`./events/${dir}/${args}.js`);

        if (typeof data === "undefined") return;
        const bin = await sourcebin.create(
          [{ content: `${data.toString()}`, language: "js" }],
          { title: `${args}.js`, description: " " }
        );
        await message.channel.send(bin.url);
      } catch (err) {
        return;
      }
    }
      
    
    
  }
}