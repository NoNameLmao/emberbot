import { CommandInteraction, CommandInteractionOptionResolver } from "discord.js"
import { SlashCommandBuilder } from '@discordjs/builders'
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
    europesimStartDate: string
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
export interface GuildConfig {
    [guild_id: string]: {
        prefix: string
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
    run(interaction: CommandInteraction, args?: Omit<CommandInteractionOptionResolver, "getMessage" | "getFocused">): any
    slashCommandOptions?: SlashCommandBuilder
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
