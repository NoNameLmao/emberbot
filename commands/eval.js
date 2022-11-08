const { MessageEmbed } = require('discord.js')
const { getRandomInt, jsonRead, limit, sleep } = require('emberutils')
const { client } = require('..')
const { SlashCommandBuilder, SlashCommandStringOption } = require('@discordjs/builders')

const CommandHandler = require('./handler.js')
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
        /** @type {MiscJSON} */
        const { technobladeQuotes } = await jsonRead('./misc.json')
        function randomTechnoQuote() {
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
                .setColor(interaction.member.displayHexColor)
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
}
