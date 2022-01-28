import { Message } from "discord.js";
import { jsonRead, getRandomInt } from "emberutils";
import { MiscJSON } from "../interfaces";
import { Command } from "./-handler";

module.exports = {
    name: 'quote',
    aliases: [],
    description: 'send a random technoblade quote because he never dies',
    async run(message: Message, args: string[]) {
        const { technobladeQuotes } = await jsonRead('./misc.json') as MiscJSON;
        function randomTechnoQuote(): string {
            return technobladeQuotes[getRandomInt(technobladeQuotes.length + 1)];
        }
        await message.channel.send(`"${randomTechnoQuote()}"`);
    }
} as Command;