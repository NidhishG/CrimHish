module.exports = {
  name: 'chess',
  aliases: ['chesstogether'],
  description: 'chess together feature',
  async run(client, message, args){
            const voice_channel = message.member.voice.channel;
        if (!voice_channel) return message.channel.send('You need to be in a voice channel to use this command.');

            client.discordTogether.createTogetherCode(message.member.voice.channel.id, 'chess').then(async invite => {
                return message.channel.send(`${invite.code}`);
            });
        

  }
}