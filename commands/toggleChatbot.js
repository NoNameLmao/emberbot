const { SlashCommandBuilder } = require('discord.js');
const { chatbot } = require('../index.js')

/** @type {import('../modules/interfaces').Command} */
module.exports = {
    data: new SlashCommandBuilder()
        .setName('togglechatbot')
        .setDescription('Used to toggle chatbot in the channel where you used this command (gets reset every bot restart)'),
    async run(interaction) {
        /** @param {Message} message */
        function messageListener(message) {
            if (!chatbot.enabledForChannels.has(message.channel.id) || message.author.bot || !message.content) return
            message.channel.sendTyping()
            chatbot.chat({
                message: message.content,
                name: message.author.username,
                user: message.author.username,
                language: 'auto'
            }).then(msg => message.reply(msg))
        }
        if (!chatbot.enabledForChannels.has(interaction.channel.id)) {
            chatbot.enabledForChannels.add(interaction.channel.id)
            const msg = `🥱😀 good morning`
            interaction.reply(msg)
            interaction.client.on('messageCreate', messageListener)
        } else {
            chatbot.enabledForChannels.delete(interaction.channel.id)
            const msg = `😴💤💤💤`
            interaction.reply(msg)
            interaction.client.removeAllListeners('messageCreate')
        }
    }
}