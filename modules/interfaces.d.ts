import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

export interface Command {
    data: SlashCommandBuilder
    async run: (interaction: ChatInputCommandInteraction) => void
}
export interface MiscJSON {
    countryList: string[]
    technobladeQuotes: string[]
    months: string[]
}
export interface ServerInfo {
    serverStatus: 'online' | 'offline'
    serverip: string
    version: string
    protocol: string
    players: number
    maxplayers: number
    motd: {
        text: string,
        legacy: boolean
    }
    ping: number
    icon: string
}