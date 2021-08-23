module.exports = {
    name: 'lieswatter',
    description: 'a lie swatter game',
    async run(client, message, args) {
    const { LieSwatter } = require('weky');
    await LieSwatter({
        message: message,
        embed: {
            title: 'Lie Swatter',
            color: '#ff0000',
            timestamp: true,
        },
        thinkMessage: 'I am thinking',
        winMessage:
            'GG, It was a **{{answer}}**. You got it correct in **{{time}}**.',
        loseMessage: 'Better luck next time! It was a **{{answer}}**.',
        othersMessage: 'Only <@{{author}}> can use the buttons!',
        buttons: { true: 'Truth', lie: 'Lie' },
    });
    }
}