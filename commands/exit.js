const { SlashCommandBuilder } = require("discord.js");
const { sleep, jsonRead, getRandomInt } = require("emberutils");

/** @type {import('../modules/interfaces').Command} */
module.exports = {
    data: new SlashCommandBuilder()
        .setName('exit')
        .setDescription('shortcut to process.exit(0)'),
    async run(interaction) {
        interaction.deferReply()
        if (interaction.user.id === '341123308844220447') {
            interaction.editReply('im not gonna go offline forever, am i?')
            await sleep(500)
            process.exit(0)
        } else {
            /** @type {import('../modules/interfaces').MiscJSON} */
            const { technobladeQuotes } = await jsonRead('./misc.json')
            interaction.editReply(`❌ ${technobladeQuotes[getRandomInt(technobladeQuotes.length + 1)]}`)
        }
    }
}