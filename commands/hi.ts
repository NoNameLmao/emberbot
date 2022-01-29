import { Message } from "discord.js";
import { Command } from "./-handler";

module.exports = {
    name: 'hi',
    aliases: ['hello'],
    description: 'Usually used to check if I\'m responding or not, but other than that - useless',
    async run(message: Message, args: string[]) {
        await message.channel.send('hi im online what do u want (main branch)');
    }
} as Command;