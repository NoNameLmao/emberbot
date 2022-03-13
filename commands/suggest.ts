import { client } from ".."
import { SlashCommand } from "../modules/interfaces"
import { SlashCommandBuilder, SlashCommandStringOption } from '@discordjs/builders'
import { CommandHandler } from './-handler'
const { replyToCommand } = CommandHandler

const name = 'suggest'
const description = 'Send an idea on how to improve the bot (or a bug to fix)'
const slashCommandOptions = new SlashCommandBuilder()
.setName(name)
.setDescription(description)
.addStringOption(
    new SlashCommandStringOption()
    .setName('suggestion')
    .setDescription('Text that you want to send as a suggestion')
    .setRequired(true)
)

module.exports = {
    name, description,
    slashCommandOptions,
    async run(interaction, args) {
        const suggestion = args.getString('suggestion')
        const emberglaze = await interaction.client.users.fetch(client.emberglazeID)
        emberglaze.send(`Bot suggestion by ${interaction.user.tag}:\n\`${suggestion}\`\nSent at ${interaction.createdAt} in <#${interaction.channel.id}>`)
        const msg = 'Your suggestion has been sent! thanks'
        replyToCommand({ interaction, options: { content: msg } })
    }
} as SlashCommand
