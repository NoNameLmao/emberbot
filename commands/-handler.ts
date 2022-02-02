import fs = require('fs/promises');
import { jsonRead } from 'emberutils';
import { Command, Config } from '../interfaces';
import { Message } from 'discord.js';

export async function importCommand(fileName: string) {
    return await import(`./${fileName}`) as Command;
}
const commands: Command[] = [];
export async function handleCommand(message: Message) {
    const files = await fs.readdir('./commands/');
    for await (let file of files) {
        if (file === '-handler.ts') continue;
        const command = await importCommand(file);
        if (command.aliases === undefined) command.aliases = [];
        commands.push(command);
    }
    const { prefix } = await jsonRead('./config.json') as Config;
    if (message.content.startsWith(prefix) && !message.content.startsWith(prefix + prefix)) {
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const commandInMessage = args.shift().toLowerCase();
        const matchingCommand = commands.filter(command => command.name === commandInMessage || command.aliases.includes(commandInMessage));
        if (!matchingCommand[0]) return;
        matchingCommand[0].run(message, args);
    };
}