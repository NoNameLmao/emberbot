const { TextChannel, GuildMember, Guild } = require('discord.js')
const DiscordClient = require('./discord_client.js')
const logger = require('./logger.js')

// the discord server, not what you thought
module.exports = class CandyVan {
    serverID = "1039235267824988180"
    welcomeGoodbyeChannelID = "1039261475660890213"
    /** @param {import('./client.js')} discordClient */
    async init(discordClient) {
        const server = await discordClient.guilds.fetch(this.serverID)
        /**
         * @type {{server: Guild, welcomeGoodbyeChannel: TextChannel, client: DiscordClient}}
         */
        this.discord = {
            server: server,
            welcomeGoodbyeChannel: await server.channels.fetch(this.welcomeGoodbyeChannelID).catch(error => {
                logger.error(`[CandyVan] Error fetching server!!`)
                logger.error(`  · Error message: ${err.message}`)
                logger.error(`  · Full error stack:\n${err.stack}`)
            }),
            client: discordClient
        }
    }
    /**
     * Welcome members when they join the server
     * @param {GuildMember} member 
     */
    welcomeMember(member) {
        this.discord.welcomeGoodbyeChannel.send(`<@${member.id}> has joined this server. 👋`)
    }
    /**
     * Send goodbye message when members leave the server
     * @param {GuildMember} member
     */
    farewellMember(member) {
        this.discord.welcomeGoodbyeChannel.send(`<@${member.id}> has left the server. 🪦`)
    }
    /**
     * Monitor for all joins and leaves in the guild
     */
    monitorJoinsAndLeaves() {
        this.discord.client.on('guildMemberAdd', member => {
            if (!member.guild.id !== this.discord.server.id) return
            this.welcomeMember(member)
        })
        this.discord.client.on('guildMemberRemove', member => {
            if (!member.guild.id !== this.discord.server.id) return
            this.farewellMember(member)
        })
    }
}