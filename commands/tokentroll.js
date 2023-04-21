const { SlashCommandBuilder, codeBlock } = require('discord.js')

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
    async execute(interaction) {
        await interaction.deferReply()
        const user = interaction.options.getUser('guildmember', true)
        interaction.editReply(`The beginnning of ${user.tag}'s token is ${codeBlock(Buffer.from(user.id).toString('base64') + '.')}`)
    }
}