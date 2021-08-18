const axios = require("axios"),
{ MessageEmbed } = require("discord.js")
module.exports = {
    name: "country", 
    description: 'gives info on a country',
    async run(client, message, args) {
 const content = args.join(" ")
 if(!content) return message.channel.send("Please provide a country name!") 
 try {
    const body = await axios.get(`https://api.popcatdev.repl.co/countries/${content}`)
    const c = body.data
    const embed = new MessageEmbed()
    .setColor("ff0000")
    .setTitle(c.name)
    .setThumbnail(c.flag)
    .addField("Name", c.name, true)
    .addField("Capital", c.capital, true)
    .addField("Domain", c.domain, true)
    .addField("Region", c.region, true)
    .addField("Population", c.population, true)
    .addField("Area", c.area, true)
    .addField("Currency", `${c.currency.name} (${c.currency.short})\nSymbol: ${c.currency.symbol}`)
    message.channel.send(embed)
 } catch (error) {
    message.channel.send("Invaid country!")
 }
    }
}
