import { sleep, chance } from "emberutils"
import { SlashCommand } from "../modules/interfaces"
import { CommandHandler } from './-handler'
const { replyToCommand } = CommandHandler

module.exports = {
    name: 'ben',
    description: 'A replica of Talking Ben\'s phone thing',
    async run({ interaction }) {
        const { channel } = interaction
        const responses = ['no', 'yes', 'ho ho ho ho', 'eugh']
        await replyToCommand({ interaction, options: { content: 'summoning ben...' } })

        await channel.send('*ringing*')
        await sleep(1000)
        await channel.send('*picks up*')
        await sleep(1000)
        await channel.send('ben?')
        await handleAnswer()

        function waitForMessage() { 
            return new Promise(async (resolve, reject) => {
                setTimeout(reject, 5000)
                interaction.client.on('messageCreate', message => {
                    if (message.channel.id === channel.id) {
                        if (message.author.id === interaction.client.user.id) return
                        resolve(message)
                    }
                })
            })
        }
        async function handleAnswer() {
            let response: string;
            await waitForMessage().catch(async () => {
                await channel.send('*hangs up*')
                response = 'hang up'
            })
            if (chance(15)) {
                await sleep(2500)
                await channel.send('*hangs up*')
                response = 'hang up'
            }
            if (response === 'hang up') return
            response = responses[Math.floor(Math.random() * responses.length)]
            await sleep(1500)
            await channel.send(response)
            await handleAnswer()
        }
    }
} as SlashCommand
