const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const mcdata = require('mcdata');

/** @type {import('../modules/interfaces').Command} */
module.exports = {
    data: new SlashCommandBuilder()
        .setName('minecraft')
        .setDescription('Categorised minecraft commands.')
        .addSubcommand(subcommand =>
            subcommand
                .setName('serverinfo')
                .setDescription(`Ping a Minecraft Java Edition server for it's information`)
                .addStringOption(option =>
                    option
                        .setName('server_ip')
                        .setDescription('The server IP address or domain')
                        .setRequired(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('playerinfo')
                .setDescription('Display information about a Minecraft Java Edition player')
                .addStringOption(option =>
                    option
                        .setName('playername')
                        .setDescription(`The player's in-game name`)
                        .setRequired(true)
                )
        ),
    async execute(interaction) {
        await interaction.deferReply()
        const subcommand = interaction.options.getSubcommand(true)
        if (subcommand == 'serverinfo') {
            try {
                const serverip = `${interaction.options.getString('server_ip')}`
                /** @type {import('../modules/interfaces').ServerInfo} */
                const serverInfo = await mcdata.serverStatus(serverip)
                const serverInfoEmbed = new EmbedBuilder()
                    .setTitle('Server Information')
                    .setColor(interaction.member.displayHexColor)
                    .setAuthor({ name: serverip })
                    .addFields(
                        {
                            name: 'Status',
                            value: `Currently ${serverInfo.serverStatus}`,
                            inline: true
                        },
                        {
                            name: 'Server IP',
                            value: serverInfo.serverip,
                            inline: true
                        },
                        {
                            name: 'Version',
                            value: serverInfo.version,
                            inline: true
                        },
                        {
                            name: 'Players',
                            value: `${serverInfo.players}/${serverInfo.maxplayers} online`,
                            inline: true
                        },
                        {
                            name: 'MOTD',
                            value: removeMCColorCodes(serverInfo.motd.text),
                            inline: true
                        },
                        {
                            name: 'Ping',
                            value: `${serverInfo.ping}ms`,
                            inline: true
                        }
                    )
                interaction.editReply({ embeds: [serverInfoEmbed] })
            } catch (error) {
                interaction.editReply(`❌ Error while pinging:\n\`${error}\``)
            }
        } else if (subcommand == 'playerinfo') {
            try {
                const playerName = interaction.options.getString('playername')
                /** @type {import('../modules/interfaces').PlayerInfo} */
                const playerInfo = await mcdata.playerStatus(playerName)
                const playerInfoEmbed = new EmbedBuilder()
                .setTitle('Player information')
                .setColor(interaction.member.displayHexColor)
                .setAuthor({ name: `${playerName}` })
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
                interaction.editReply({ embeds: [playerInfoEmbed] })
            } catch (error) {
                interaction.editReply(`There was an error!\n${error}`)
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