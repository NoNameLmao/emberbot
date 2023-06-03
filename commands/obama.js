// forbidden obama module
const { SlashCommandBuilder } = require('discord.js');
const { jsonRead, getRandomInt } = require("emberutils");

/** @type {import('../modules/interfaces').Command} */ // idk what this does but i'm putting it here
module.exports = {
    data: new SlashCommandBuilder()
        .setName('obama')
        .setDescription('random obama quote'),
    async execute(interaction) {
        await interaction.deferReply()
        /** @type {import('../modules/interfaces').MiscJSON}*/ // I added a obamaQuotes to miscjson, idk if that's what im supposed to do
        const obamaQuotes = await jsonRead('./obama.json');
        interaction.editReply(obamaQuotes[getRandomInt(obamaQuotes.length + 1)].quote)
    }
}