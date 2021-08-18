module.exports = {
    name: 'neverhaveiever',
    aliases: ['nhie'],
    description: 'a trivia command',
    async run(client, message, args) {
    const { NeverHaveIEver } = require('weky');
await NeverHaveIEver({
	message: message,
	embed: {
		title: 'Never Have I Ever',
		color: '#ff0000',
		timestamp: true,
	},
	thinkMessage: 'I am thinking',
	othersMessage: 'Only <@{{author}}> can use the buttons!',
	buttons: { optionA: 'I have', optionB: 'I have not' },
});


    }
}