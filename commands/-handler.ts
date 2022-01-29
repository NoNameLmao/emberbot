import fs = require('fs/promises');
import { jsonRead } from 'emberutils';
import { Config } from '../interfaces';
import { Message } from 'discord.js';
import { Dirent } from 'fs';
export interface Command {
    name: string;
    aliases?: string[];
    description: string;
    hideFromHelp?: boolean;
    run(message: Message, args?: string[]): any;
}
export async function importCommand(file: Dirent) {
    if (file.name === 'handler.ts') return;
    return await import(`./${file.name}`) as Command;
}
const commands: Command[] = [];
export async function handleCommand(message: Message) {
    const files = await fs.readdir('./commands/', { withFileTypes: true });
    for await (let file of files) {
        const command = await importCommand(file);
        if (command.aliases === undefined) command.aliases = [];
        commands.push(command);
    }
    const { prefix } = await jsonRead('./config.json') as Config;
    if (message.content.startsWith(prefix) && !message.content.startsWith(prefix + prefix)) {
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const commandInMessage = args.shift().toLowerCase();
        const matchingCommand = commands.filter(command => command.name === commandInMessage || command.aliases.includes(commandInMessage));
        matchingCommand[0].run(message, args);
    };
}