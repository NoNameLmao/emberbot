import { GuildMember, MessageEmbed } from "discord.js"
import { jsonRead } from "emberutils"
import { Config, SlashCommand } from "../modules/interfaces"
import { CommandHandler } from './-handler'
const { replyToCommand } = CommandHandler

module.exports = {
    name: 'convert',
    description: 'Categorised commands for conversion. Run this command for more information.',
    slashCommandOptions: [
        {
            name: 'convertOption',
            description: 'Convert from * to *',
            type: 3,
            choices: [
                {
                    name: 'text2bf',
                    value: 'Convert text to brainf*ck'
                }
            ],
            required: false
        }
    ],
    async run({ args, interaction }) {
        const config = await jsonRead('./config.json') as Config
        if (!args[0]) {
            const convertEmbed = new MessageEmbed()
            .setTitle('Command category: Convert')
            .setDescription(`Usage: ${config.prefix}convert (command)\n<> = Optional argument(s)`)
            .setColor((interaction.member as GuildMember).displayHexColor)
            .addField('text2bf', 'Convert text to brainfuck')
            .setFooter({ text: 'Commands for converting stuff to other stuff'})
            replyToCommand({ interaction, options: { embeds: [convertEmbed] } })
        } else if (args[0] === 'text2bf') {
            if (!args[1]) {
                const msg = `❌ you didnt provide any text\nusage: ${config.prefix}convert text2bf (text)`
                replyToCommand({ interaction, options: { content: msg } })
                return
            } else {
                const { text2bf } = await import('../stuff/text2bf'),
                text = args.slice(1).join(' '),
                bf = text2bf(text)
                const text2bfEmbed = new MessageEmbed()
                .setTitle('convert text2bf')
                .setDescription('Converted text to brainfuck')
                .setColor((interaction.member as GuildMember).displayHexColor)
                .setFields(
                    {
                        name: 'Original text',
                        value: text
                    },
                    {
                        name: 'Brainfuck',
                        value: bf
                    }
                )
                replyToCommand({ interaction, options: { embeds: [text2bfEmbed] } })
            }
        }
    }
} as SlashCommand
