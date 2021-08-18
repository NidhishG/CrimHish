module.exports = {
    name: 'trivia',
    description: 'a trivia command',
    async run(client, message, args) {
          const { Trivia } = require('weky');

  await Trivia({
    message: message,
    embed: { color: '#ff0000', timestamp: true },
    difficulty: 'medium',
    thinkMessage: 'I am thinking',
    winMessage:
      'GG, It was **{{answer}}**. You gave the correct answer in **{{time}}**.',
    loseMessage: 'Better luck next time! The correct answer was **{{answer}}**.',
    emojis: {
      one: '1️⃣',
      two: '2️⃣',
      three: '3️⃣',
      four: '4️⃣',
    },
    othersMessage: 'Only <@{{author}}> can use the buttons!',
    returnWinner: false,
  });

    }
}