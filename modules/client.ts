import { Client, Guild, VoiceChannel } from 'discord.js'
import * as voice from '@discordjs/voice'
import { log } from './logger'

export class DiscordClient extends Client {
    token: string
    europesimIds = {
        guildID: '846807940727570433',
        dateChannelID: '848247855789375508'
    }
    // type, not the actual object yet
    europesim: {
        guildID: string,
        dateChannelID: string,
        guild: Guild,
        dateChannel: VoiceChannel,
        joinDateChannel(): voice.VoiceConnection
    }
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
        return new Promise<void>(async (resolve, reject) => {
            try {
                (await import('dotenv')).config()
                this.token = process.env.DJS_TOKEN
                this.login(this.token)
                const guild = await this.guilds.fetch(this.europesimIds.guildID)
                const dateChannel = await guild.channels.fetch(this.europesimIds.dateChannelID) as VoiceChannel
                this.europesim = {
                    ...this.europesimIds,
                    guild, dateChannel,
                    joinDateChannel() {
                        return this._voice.joinVoiceChannel({
                            guildId: this.europesimIds.guildID,
                            channelId: this.europesimIds.dateChannelID,
                            adapterCreator: (this.europesim.guild.voiceAdapterCreator) as voice.DiscordGatewayAdapterCreator
                        })
                    }
                }
                this.initialized = true
                resolve()
                log('info', 'Done initializing discord client')
            } catch (err) {
                log('error', 'Failed to initialize discord client')
                reject(err as Error)
            }
            this
            .once('ready', () =>  log('info', `Discord client successfully logged in as ${this.user.tag}`))
            .on('rateLimit', rateLimitData => log('warn', `Rate limit! Global: ${rateLimitData.global}, ${rateLimitData.limit}, ${rateLimitData.method}, ${rateLimitData.timeout}`))
            .on('warn', warning => log('warn', `${warning}`))
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
