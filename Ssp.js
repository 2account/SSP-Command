const Discord = require('discord.js')

module.exports = {
    name: "ssp", // Dette skal du skrive for at, du kan spille.
    description: "En sjov Sten Sak papir", // En beskrivelse af commanden.

    async run (bot, message, args) {
        let embed = new Discord.MessageEmbed() 
        .setTitle("SSP")
        .setDescription("Reager for at spille!")
        .setTimestamp()
        .setColor('#7d1eb0')
        let msg = await message.channel.send(embed) // Her siger du, at den skal sende din embed.
        await msg.react("🗻") // Dette er hvad botten reacter med når, du skriver commanden.
        await msg.react("✂") // Dette er hvad botten reacter med når, du skriver commanden.
        await msg.react("📰") // Dette er hvad botten reacter med når, du skriver commanden.

        const filter = (reaction, user) => {
            return ['🗻', '✂', '📰'].includes(reaction.emoji.name) && user.id === message.author.id;
        }

        const choices = ['🗻', '✂', '📰']
        const me = choices[Math.floor(Math.random() * choices.length)]
        msg.awaitReactions(filter, {max: 1, time: 60000, error: ["time"]}).then(
            async(collected) => {
                const reaction = collected.first()
                let result = new Discord.MessageEmbed()
                .setTitle("Resultat")
                .addField("Dit valg", `${reaction.emoji.name}`) // = Dit valg
                .addField("Bots valg", `${me}`) // Dette er Bottens valg
                .setColor('#7d1eb0')
                await msg.edit(result)

                if((me === "🗻" && reaction.emoji.name === "✂") ||
                (me === "✂" && reaction.emoji.name === "📰") ||
                (me === "📰" && reaction.emoji.name === "🗻")) {
                    message.reply("Du tabte!"); // Hvis du taber
                } else if (me === reaction.emoji.name) {
                    return message.reply("Det er uafgjort!"); // Hvis det bliver uafgjort.
                } else {
                    return message.reply("Du vandt!"); // Dette er hvis u vinder.
                }
            })
            .catch(collected => {
                message.reply('Processen er annulleret, du kunne ikke svare i tide!'); // Hvis du ikke når og svarer.
            }) 

    }
}
