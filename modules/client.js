const { Client } = require('discord.js')
const voice = require('@discordjs/voice')
const { log } = require('./logger.js')

module.exports = class DiscordClient extends Client {
    emberglazeID = '341123308844220447'
    _voice = voice
    initialized = false
    constructor() {
        super({
            intents: 32767,
            presence: {
                status: 'online',
                activities: [
                    {
                        name: '.help',
                        type: 'PLAYING',
                    }
                ],
            },
            allowedMentions: {
                parse: ['roles', 'users']
            }
        })
    }

    init() {
        log('info', 'Initializing discord client...')
        return new Promise(async (resolve, reject) => {
            try {
                (await import('dotenv')).config()
                this.token = process.env.DJS_TOKEN
                this.login(this.token)
                this.initialized = true
                resolve()
                log('info', 'Done initializing discord client')
            } catch (err) {
                log('error', 'Failed to initialize discord client')
                reject(err)
            }
            this.once('ready', () => log('info', `Discord client successfully logged in as ${this.user.tag}`))
            .on('rateLimit', rateLimitData => {
                log('warn', `Discord client has been rate limited`)
                log('warn', `  · Global: ${rateLimitData.global}`)
                log('warn', `  · Limit: ${rateLimitData.limit}`)
                log('warn', `  · Method: ${rateLimitData.method}`)
                log('warn', `  · Timeout: ${rateLimitData.timeout}ms`)
            }).on('warn', warning => log('warn', `${warning}`))
            .on('error', error => log('error', `${error}`))
            .on('invalidated', () => log('error', `Discord session invalidated`))
            .on('guildCreate', guild => log('info', `➕ Joined "${guild.name}" (${guild.memberCount} members)`))
            .on('guildDelete', guild => log('info', `➖ Left "${guild.name}" (${guild.memberCount} members)`))
        })
    }
    get guildCount() {
        if (!this.initialized) throw new Error('Discord client is not initialized!')
        return this.guilds.cache.size
    }
}