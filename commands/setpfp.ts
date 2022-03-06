import { client } from ".."
import { SlashCommand } from "../modules/interfaces"
import { CommandHandler } from './-handler'
const { replyToCommand } = CommandHandler

module.exports = {
    name: 'setpfp',
    description: 'only ember can do this dont even try',
    hideFromHelp: true,
    slashCommandOptions: [
        {
            name: 'url',
            description: 'Image for me to change my profile picture to',
            type: 3,
            autocomplete: true,
            required: true
        }
    ],
    async run({ interaction, args }) {
        if (interaction.member.user.id === client.emberglazeID) {
            replyToCommand({ interaction, options: { content: '⏱️' } })
            let url = args[0] as string
            await interaction.client.user.setAvatar(url)

            const msg = 'done, how do i look now? (refresh discord or make me send another message in order for it to show)'
            replyToCommand({ interaction, options: { content: msg } })
        } else replyToCommand({ interaction, options: { content: '❌ get real' } })
    }
} as SlashCommand
