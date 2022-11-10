const { EmbedBuilder, SlashCommandBuilder, SlashCommandSubcommandGroupBuilder, SlashCommandSubcommandBuilder } = require('discord.js')
const mcdata = require('../modules/mcdata')
const CommandHandler = require('./handler.js')
const { replyToCommand } = CommandHandler

const name = 'minecraft'
const description = 'Categorised minecraft commands.'
const slashCommandOptions = new SlashCommandBuilder()
.setName(name)
.setDescription(description)
.addSubcommandGroup(group =>
    group
    .setName('command')
    .setDescription('Minecraft category commands')
    .addSubcommand(
        new SlashCommandSubcommandBuilder()
        .setName('serverinfo')
        .setDescription('Ping a Minecraft Java Edition server for it\'s information')
    )
    .addSubcommand(
        new SlashCommandSubcommandBuilder()
        .setName('playerinfo')
        .setDescription('Display information about a Minecraft Java Edition player')
    )
)

module.exports = {
    name, description,
    slashCommandOptions,
    async run(interaction, args) {
        const subcommand = args.getSubcommand(true)
        if (subcommand == 'serverinfo') {
            try {
                replyToCommand({ interaction, options: { content: 'Pinging minecraft server...' } })
                /** @type {import('../modules/interfaces').ServerInfo} */
                const serverinfo = await mcdata.serverStatus(args[1])
                const serverInfoEmbed = new EmbedBuilder()
                .setTitle('Server Information')
                .setColor(interaction.member.displayHexColor)
                .setAuthor({ name: `${args[1]}` })
                .addField('Status', `Currently ${serverinfo.serverStatus}`, true)
                .addField('Server IP', serverinfo.serverip, true)
                .addField('Version', serverinfo.version, true)
                .addField('Players', `${serverinfo.players}/${serverinfo.maxplayers} online`, true)
                .addField('MOTD', removeMCColorCodes(serverinfo.motd.text), true)
                .addField('Ping', `${serverinfo.ping}ms`, true)
                replyToCommand({ interaction, options: { embeds: [serverInfoEmbed] } })
            } catch (error) {
                const errorMessage = `❌ Error while running this command:\n\`${error}\``
                replyToCommand({ interaction, options: { content: errorMessage } })
            }
        } else if (subcommand == 'playerinfo') {
            try {
                /** @type {import('../modules/interfaces').PlayerInfo} */
                const playerInfo = await mcdata.playerStatus(args[1])
                const playerInfoEmbed = new EmbedBuilder()
                .setTitle('Player information')
                .setColor(interaction.member.displayHexColor)
                .setAuthor({ name: `${args[1]}` })
                .addFields(
                    {
                        name: 'UUID',
                        value: `${playerInfo.uuid}`
                    },
                    {
                        name: 'Name history',
                        value: `${playerInfo.nameHistory}`
                    }
                )
                replyToCommand({ interaction, options: { embeds: [playerInfoEmbed] } })
            } catch (error) {
                replyToCommand({ interaction, options: { content: `There was an error!\n${error}` } })
            }
        }
        /** @param {string} string */
        function removeMCColorCodes(string) {
            return string
            // color
            .replace('§4', '').replace('§c', '').replace('§6', '').replace('§e', '').replace('§2', '').replace('§a', '').replace('§b', '').replace('§3', '').replace('§1', '')
            .replace('§9', '').replace('§d', '').replace('§5', '').replace('§f', '').replace('§7', '').replace('§8', '').replace('§0', '')
            // font
            .replace('§k', '').replace('§l', '').replace('§m', '').replace('§n', '').replace('§o', '').replace('§r', '')
        }
    }
}
