const { TextChannel, GuildMember, Guild } = require('discord.js')
const DiscordClient = require('./client.js')
const { log } = require('./logger.js')

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
                log('error', `[CandyVan] Error fetching server!!`)
                log('error', `  · Error message: ${err.message}`)
                log('error', `  · Full error stack:\n${err.stack}`)
            }),
            client: discordClient
        }
    }
    /**
     * @param {GuildMember} member 
     */
    welcomeMember(member) {
        this.discord.welcomeGoodbyeChannel.send(`<@${member.id}> has joined this server. 👋`)
    }
    /**
     * @param {GuildMember} member 
     */
    farewellMember(member) {
        this.discord.welcomeGoodbyeChannel.send(`<@${member.id}> has left the server. 🪦`)
    }
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