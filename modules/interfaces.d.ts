import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import * as stream from "stream"
import * as rl from "readline"

export interface Command {
    data: SlashCommandBuilder
    async execute: (interaction: ChatInputCommandInteraction) => void
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
export interface Serverline {
	init(options: string): void
	secret(query: string, callback: () => {}): void
	question(): void
	getPrompt(): string
	setPrompt(strPrompt: string): void
	isMuted(): boolean
	setMuted(enabled: boolean, msg?: string): boolean
	setCompletion(obj: object): void
	getHistory(): string[]
	setHistory(history: string[]): boolean
	getCollection(): {
		stdout: stream.Writable,
		stderr: stream.Writable
	}
	getRL(): rl.Interface
	close(): void
	pause(): void
	resume(): void
    on(eventName: "line", cb: (line: string) => any): any
	on(eventName: "SIGINT" | "completer"): any
}