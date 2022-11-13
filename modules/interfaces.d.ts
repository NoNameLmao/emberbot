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