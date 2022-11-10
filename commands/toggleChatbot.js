const CommandHandler = require('./handler.js')
const { SlashCommandBuilder, CommandInteraction } = require('discord.js')
const ChatbotClient = require('../modules/chatbot.js').Client
require('dotenv').config
const name = 'togglechatbot'
const description = 'Used to toggle chatbot in the channel where you used this command (gets reset every bot restart)'
const slashCommandOptions = new SlashCommandBuilder()
.setName(name)
.setDescription(description)

const chatbot = new ChatbotClient(process.env.LEBYY_CHATBOT_API_KEY)

module.exports = {
    name, description,
    slashCommandOptions,
    /** 
     * @param {CommandInteraction} interaction
     * @param {ChatbotClient} chatbot
     * */
    async run(interaction) {
        if (!chatbot.enabledForChannels.has(interaction.channel.id)) {
            chatbot.enabledForChannels.add(interaction.channel.id)
            const msg = `🥱😀 good morning`
            CommandHandler.replyToCommand({ interaction, options: { content: msg } })
            interaction.client.on('messageCreate', async message => {
                if (!chatbot.enabledForChannels.has(message.channel.id) || message.author.bot || !message.content) return
                message.channel.sendTyping()
                const msg = (
                    await chatbot.chat({
                        message: message.content,
                        name: message.author.username,
                        user: message.author.username,
                        language: 'auto'
                    })
                )
                message.reply(msg)
            })
        } else {
            chatbot.enabledForChannels.delete(interaction.channel.id)
            const msg = `😴💤💤💤`
            CommandHandler.replyToCommand({ interaction, options: { content: msg } })
        }
    }
}
