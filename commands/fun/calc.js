const lineReply = require('../../lineReply')
module.exports = {
  name: "calculater",
  aliases: ['calc', 'math'],
  description: "get a button calculator",
  async run(client, message, args) {
  const { Calculator } = require("weky");
  await Calculator({
    message: message,
    embed: {
        title: 'Calculator',
        color: '#ff0000',
        timestamp: true
    },
    disabledQuery: 'Calculator is disabled!',
    invalidQuery: 'The provided equation is invalid!',
    othersMessage: 'Only <@{{author}}> can use the buttons!',
    inlineReply: lineReply
});
  }
}