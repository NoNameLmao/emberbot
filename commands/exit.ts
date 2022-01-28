import { Message } from "discord.js";
import { jsonRead, getRandomInt } from "emberutils";
import { MiscJSON } from "../interfaces";
import { Command } from "./-handler";

module.exports = {
    name: 'exit',
    aliases: [],
    description: 'shortcut to process.exit(0)',
    async run(message: Message, args: string[]) {
        const emberID = '341123308844220447';
        if (message.author.id === emberID) {
            await message.channel.send(':sob:');
            process.exit(0);
        } else {
            const { technobladeQuotes } = await jsonRead('./misc.json') as MiscJSON;
            function randomTechnoQuote(): string {
                return technobladeQuotes[getRandomInt(technobladeQuotes.length + 1)];
            }
            await message.channel.send(`❌ ${randomTechnoQuote()}`);
        }
    }
} as Command;