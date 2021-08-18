const simplydjs = require('simply-djs')

module.exports = {
  name: 'tictactoe',
  description: 'play tictactoe against someone',
  aliases: ['ttt'],
  async run(client, message, args) {
    simplydjs.tictactoe(message, {
    embedColor: 'ff0000',
    embedFoot: 'CrimHish TicTacToe'
})

  }
   
}