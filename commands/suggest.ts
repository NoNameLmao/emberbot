import { client } from ".."
import { SlashCommand } from "../modules/interfaces"
import { CommandHandler } from './-handler'
const { replyToCommand } = CommandHandler

module.exports = {
    name: 'suggest',
    description: 'send an idea on how to improve the bot (or a bug to fix)',
    async run({ interaction, args }) {
        const suggestion = args.join(' ')

        const ember = await interaction.client.users.fetch(client.emberglazeID)
        ember.send(`Bot suggestion by ${interaction.user.tag}:\n\`${suggestion}\`\nSent at ${interaction.createdAt} in <#${interaction.channel.id}>`)

        const msg = 'Your suggestion has been sent! thanks'
        replyToCommand({ interaction, options: { content: msg } })
    }
} as SlashCommand
