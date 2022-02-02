import { Message } from "discord.js";
import { jsonRead, getRandomInt } from "emberutils";
import { MiscJSON, Command } from "../interfaces";

module.exports = {
    name: 'quote',
    aliases: [],
    description: 'send a random technoblade quote because he never dies',
    async run(message: Message, args: string[]) {
        const { technobladeQuotes } = await jsonRead('./misc.json') as MiscJSON;
        let number: number;
        if (args[0]) number = parseInt(args[0]);
        else number = getRandomInt(technobladeQuotes.length + 1);
        technobladeQuotes[getRandomInt(technobladeQuotes.length + 1)];
        message.channel.send(
            `Quote number **${number}**:\n` +
            `**${technobladeQuotes[number]}**`
        );
    }
} as Command;