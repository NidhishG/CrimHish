
const fetch = require('node-fetch')
function getB(life, person) {
		let uid = person;
		let message = life;
		let response = fetch(`https://discord.com/api/v8/users/${uid}`, {
			method: 'GET',
			headers: {
				Authorization: `Bot ${process.env.DISCORD_TOKEN}`
			}
		});
		let receive = '';
		let banner =
			'https://cdn.discordapp.com/attachments/829722741288337428/834016013678673950/banner_invisible.gif';
		response
			.then(a => {
				if (a.status !== 404) {
					a.json().then(data => {
						receive = data['banner'];
						if (receive !== null) {
							let response2 = fetch(
								`https://cdn.discordapp.com/banners/${uid}/${receive}.gif`,
								{
									method: 'GET',
									headers: {
										Authorization: `Bot ${process.env.DISCORD_TOKEN}`
									}
								}
							);
							let statut = '';
							response2.then(b => {
								statut = b.status;
								banner = `https://cdn.discordapp.com/banners/${uid}/${receive}.gif?size=1024`;
								if (statut === 415) {
									banner = `https://cdn.discordapp.com/banners/${uid}/${receive}.png?size=1024`;
								}
							});
						}
					});
				}
			})
 var promise = new Promise(function(resolve, reject) {
     setTimeout(() => {
       resolve(banner);
     }, 1000)
   })
   return promise;
			}
		
	module.exports = getB