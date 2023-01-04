const { SlashCommandBuilder } = require("discord.js");
const { jsonRead, getRandomInt } = require("emberutils");

/** @type {import('../modules/interfaces').Command} */
module.exports = {
    data: new SlashCommandBuilder()
        .setName('technoblade')
        .setDescription('random technoblade quote'),
    async run(interaction) {
        interaction.deferReply()
        /** @type {import('../modules/interfaces').MiscJSON} */
        const { technobladeQuotes } = await jsonRead('./misc.json')
        interaction.editReply(technobladeQuotes[getRandomInt(technobladeQuotes.length + 1)])
    }
}