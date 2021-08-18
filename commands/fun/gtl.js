module.exports = {
  name: 'guessthelogo',
  aliases: ['gtl'],
  description: 'play guess the logo game',
  async run(client, message, args) {
     const { GTL } = require('djs-games')
    const game = new GTL({
    message: message,
    token: "MTYyNTYyNjQwMA.pJdP72KeYwTAYRZiGBPJrFMax02mWgDn.eaf496a201d4ca5d", 
    stopCommand: "stop",
    winFooter: "You Win!",
    winColor: "GREEN",
    loseFooter: "You Lose!",
    loseColor: "RED", 
    questionFooter: "Guess the Logo!", 
    questionColor: "BLUE", 
    })
    game.start()
  }
}