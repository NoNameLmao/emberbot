import { CommandInteraction } from "discord.js"
import { ChannelType } from 'discord-api-types'

export interface ServerInfo {
    serverStatus: 'online' | 'offline',
    serverip: string,
    version: string,
    protocol: string,
    players: number,
    maxplayers: number,
    motd: {
        text: string,
        legacy: boolean
    },
    ping: number,
    icon: string
}
export interface Config {
    prefix: string,
    susprefix: string,
    europesimStartYear: number,
    europesimStartDate: string,
    tagPrefix: {
        user_specific: string
        global: string
    }
}
export interface NameHistory {
    name: string,
    changedToAt?: number
}[]
export interface PlayerInfo {
    uuid: string
    username: string
    nameHistory: NameHistory
    skin: {
        avatar: string
        renders: {
            head: {
                left: string
                right: string
            },
            body: {
                left: string
                right: string
            }
        },
        fullBody: string
        combo: string
        cape: string
        texture: {
            get: string
            download: string
            apply: string
        }
    }
}
export interface Tag {
    text: string
    info: {
        created: {
            at: number
            by: string
            byID: string
        },
        used: number
    }
}
export interface TagList {
    user_specific: {
        [user_id: string]: {
            [tagName: string]: Tag
        }
    },
    global: {
        [tagName: string]: Tag
    }
}
export interface GuildConfig {
    [guild_id: string]: {
        prefix: string
        tagPrefix: {
            user_specific: string
            global: string
        }
    }
}

export interface MiscJSON {
    countryList: string[]
    technobladeQuotes: string[]
    months: string[]
}

export interface SlashCommand {
    name: string
    description: string
    hideFromHelp?: boolean
    run({ args, interaction }: { args: (string | number | boolean)[], interaction?: CommandInteraction }): any
    slashCommandOptions?: SlashCommandOptions[]
}
export interface SlashCommandOptions {
    type: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11
    name: string
    description: string
    autocomplete?: boolean
    required?: boolean
    choices?: {
        name: string
        value: string | number
    }[]
    options?: SlashCommandOptions
    channelTypes?: ChannelType[] | number[]
    minValue?: number
    maxValue?: number
}

export interface ChatBotApiResponse {
    message: string
    error?: boolean
}
export interface ChatBotMessageOptions {
    message: string
    name?: string
    owner?: string
    user: string
    language: string
}
