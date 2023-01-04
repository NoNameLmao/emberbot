const { SlashCommandBuilder } = require('discord.js');

/** @type {import('../modules/interfaces').Command} */
module.exports = {
    data: new SlashCommandBuilder()
        .setName('rcg')
        .setDescription(`Random country picker`),
    async run(interaction) {
        interaction.deferReply()
        /** @type {import('../modules/interfaces').MiscJSON} */
        const { countryList } = await jsonRead('./misc.json')
        const msg = `Random country generator: \`${countryList[Math.floor(Math.random() * countryList.length)]}\``
        interaction.editReply(msg)
    }
}