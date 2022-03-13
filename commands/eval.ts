import { GuildMember, MessageEmbed } from "discord.js"
import { getRandomInt, jsonRead, limit, sleep } from "emberutils"
import { client } from ".."
import { MiscJSON, SlashCommand } from "../modules/interfaces"
import { SlashCommandBuilder, SlashCommandStringOption } from '@discordjs/builders'
import { CommandHandler } from './-handler'
const { replyToCommand } = CommandHandler

const name = 'eval'
const description = 'make ember debugging code easier (run js code)'
const slashCommandOptions = new SlashCommandBuilder()
.setName(name)
.setDescription(description)
.addStringOption(
    new SlashCommandStringOption()
    .setName('code')
    .setDescription('Valid javascript code')
)

module.exports = {
    name, description,
    slashCommandOptions,
    hideFromHelp: true,
    async run(interaction, args) {
        const code = args.getString('code')
        let evalEmbed = new MessageEmbed()
        .setTitle('eval result')
        .addField('Input', `\`\`\`js\n${code}\`\`\``)
        const { technobladeQuotes } = await jsonRead('./misc.json') as MiscJSON
        function randomTechnoQuote(): string {
            return technobladeQuotes[getRandomInt(technobladeQuotes.length + 1)]
        }
        if (interaction.member.user.id === client.emberglazeID) {
            try {
                let evalFinished = false
                const result = eval(
                    code +
                    `evalFinished = true`
                )
                while (evalFinished) await sleep(1)
                let output = result
                if (typeof output !== 'string') output = require('util').inspect(result)
                evalEmbed = evalEmbed
                .setColor((interaction.member as GuildMember).displayHexColor)
                .addField('✅ Output', `\`\`\`js\n${limit(output, 503)}\`\`\``)
                replyToCommand({ interaction, options: { embeds: [evalEmbed] } })
            } catch (error) {
                evalEmbed = evalEmbed
                .setColor('RED')
                .addField('❌ Error output', limit(`\`\`\`js\n${error}\`\`\``, 512))
                replyToCommand({ interaction, options: { embeds: [evalEmbed] } })
            }
        } else {
            evalEmbed = evalEmbed
            .setColor('RED')
            .addField('Technoblade never dies', `${randomTechnoQuote()}`)
            .setFooter({ text: '❌ No permission' })
            replyToCommand({ interaction, options: { embeds: [evalEmbed] } })
        }
    }
} as SlashCommand
