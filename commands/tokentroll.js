const { SlashCommandBuilder, userMention, codeBlock, channelLink, IntegrationApplication } = require('discord.js');

/** @type {import('../modules/interfaces').Command} */
module.exports = {
    data: new SlashCommandBuilder()
        .setName('token')
        .setDescription(`Send a message that includes the beginning part of a user's discord token (user id => base64)`)
        .addUserOption(option =>
            option
            	.setName('guildmember')
                .setDescription('Pick the guild member')
                .setRequired(true)
        ),
    async run(interaction) {
        const user = interaction.options.getUser('guildmember', true)
        await interaction.reply(`The beginnning of ${user.tag}'s token is ${codeBlock(Buffer.from(user.id).toString('base64') + '.')}`)
    }
}