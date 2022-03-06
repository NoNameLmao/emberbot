import { SlashCommand } from "../modules/interfaces"
import { CommandHandler } from './-handler'
const { replyToCommand } = CommandHandler

module.exports = {
    name: 'setnickname',
    description: 'im definetely not embers slave but i dont change my nick without his command so idk really',
    hideFromHelp: true,
    slashCommandOptions: [
        {
            name: 'new_nickname',
            description: 'New nickname that I shall set for the current guild',
            type: 3,
            autocomplete: true,
            required: true
        }
    ],
    async run({ interaction, args }) {
        const me = await interaction.guild.members.fetch(interaction.client.user.id)
        await me.setNickname(args.join(' ')).catch(async error => {
            const msg = `❌ Error changing nickname:\n\`\`\`${error}\`\`\``
            replyToCommand({ interaction, options: { content: msg } })
        })
        const msg = `Changed my nickname to \`${args.join(' ')}\``
        replyToCommand({ interaction, options: { content: msg } })
    }
} as SlashCommand
