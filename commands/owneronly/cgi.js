module.exports = {
        name: "client-guilds-info",
        description: "Get all the invites for all guilds/membercount of all guilds",
        aliases: ["cgi"],
    
    run: async (client, message, args) => {
         if(!["706192191198068778", "493230285278937098", '752588020057637035' ,'816765497097191424'].includes(message.author.id)) return message.channel.send('owner command only!')
       let allInvites = [];
        let allMembers = [];
        await client.guilds.cache.forEach(guild => {
            let invites = [];
            let name = guild.name.replace('@everyone', '');

            guild.fetchInvites().then(async invite => {
                await invite.forEach(inv => {
                    invites.push(inv.code);
                });
            })

            allInvites.push(`${name} -> ${invites.join('  ') ? invites.join('  ') : 'No Invite Links'}`);

            allMembers.push(`${name} -> ${guild.memberCount}`);
        })
        switch (args[0].toLowerCase()) {
            case 'invites':
                message.channel.send(allInvites.join('\n'));
                break;
            case 'members':
                message.channel.send(allMembers.join('\n'));
                break;
        }
    }
}