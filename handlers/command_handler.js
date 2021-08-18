const { readdirSync } = require('fs');
const ascii = require('ascii-table');
const path = require('path')
const table = new ascii('COMMANDS');
table.setHeading('CMDS', ' NAME || FILE');

module.exports = (client) => {
  readdirSync('./commands/').forEach(dir => {
    const commands = readdirSync(`./commands/${dir}`).filter(e => e.endsWith('.js'));

    for(let cmds of commands) {
      let cmd = require(path.resolve(`./commands/${dir}/${cmds}`));
      
      if(cmd.name) {
        client.commands.set(cmd.name, cmd)
        table.addRow(cmd.name, 'NAME')
      } else {
        table.addRow(cmd, 'FILE')
      }
    }
  })
  console.log(table.toString());
}