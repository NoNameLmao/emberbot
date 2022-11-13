const { SlashCommandBuilder } = require('discord.js');

/** @type {import('../modules/interfaces').Command} */
module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription(`Get bot's latency on discord (includes measuring with message timestamps and WebSocket ping)`),
    async run(interaction) {
        const msg = (
            `Message-measured ping: **${interaction.createdTimestamp - Date.now()}**ms\n` +
            `WebSocket ping: **${interaction.client.ws.ping}**ms`
        )
        interaction.reply(msg)
    }
}