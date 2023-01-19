const { Client } = require('discord.js')
const logger = require('./logger.js')
const djsvoice = require('@discordjs/voice')
/**
 * @class Represents a discord.js bot client with more features
 */
module.exports = class DiscordClient extends Client {
    /** emberglaze's user ID */
    emberglazeID = '341123308844220447'
    /** The `@discordjs/voice` module */
    _voice = djsvoice
    /** Whether the class is fully usable or not */
    initialized = false
    constructor() {
        super({
            intents: 3276799,
            allowedMentions: {
                parse: ['roles', 'users']
            }
        })
    }
    /**
     * Initialize the discord client class
     * @returns {Promise<void>}
     */
    init() {
        logger.info('Initializing discord client...')
        return new Promise(async (resolve, reject) => {
            try {
                require('dotenv').config()
                this.login(process.env.DJS_TOKEN)
                this.initialized = true
                resolve()
                logger.ok('Done initializing discord client')
            } catch (err) {
                logger.error('Failed to initialize discord client')
                reject(err)
            }
            this.once('ready', () => logger.ok(`Discord client successfully logged in as ${this.user.tag}`))
            .on('rateLimit', rateLimitData => {
                logger.warn(`Discord client has been rate limited`)
                logger.warn(`  · Global: ${rateLimitData.global}`)
                logger.warn(`  · Limit: ${rateLimitData.limit}`)
                logger.warn(`  · Method: ${rateLimitData.method}`)
                logger.warn(`  · Timeout: ${rateLimitData.timeout}ms`)
            }).on('warn', warning => logger.warn(`${warning}`))
            .on('error', error => logger.error(`${error}`))
            .on('invalidated', () => logger.error(`Discord session invalidated`))
            .on('guildCreate', guild => logger.info(`➕ Joined "${guild.name}" (${guild.memberCount} members)`))
            .on('guildDelete', guild => logger.info(`➖ Left "${guild.name}" (${guild.memberCount} members)`))
        })
    }
    /** Total amount of guilds the discord bot is in */
    get guildCount() {
        if (!this.initialized) throw new Error('Discord client is not initialized!')
        return this.guilds.cache.size
    }
    /** Total amount of members across all guilds that the discord bot is in */
    async getTotalMembers() {
        if (!this.initialized) throw new Error('Discord client is not initialized!')
        let members = 0
        const guilds = this.guilds.cache
        for (const guildCacheEntry of guilds) {
            const guild = guildCacheEntry[1]
            members += (await guild.members.list()).size
        }
        return members
    }
}