import { Message } from "discord.js";
import { getRandomInt, jsonRead } from "emberutils";
import { MiscJSON } from "../interfaces";
import { Command } from "./-handler";

module.exports = {
    name: 'sudo',
    description: 'no emberglaze doesnt talk for me i swear',
    hideFromHelp: true,
    async run(message: Message, args: string[]) {
        const emberID = '341123308844220447';
        if (message.author.id === emberID) {
            const sudo = args.join(' ');
            message.delete();
            await message.channel.send(sudo);
        } else {
            const { technobladeQuotes } = await jsonRead('./misc.json') as MiscJSON;
            function randomTechnoQuote(): string {
                return technobladeQuotes[getRandomInt(technobladeQuotes.length + 1)];
            }
            await message.channel.send(`❌ ${randomTechnoQuote()}`);
        }
    }
} as Command;