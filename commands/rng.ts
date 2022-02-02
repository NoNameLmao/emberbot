import { Message } from "discord.js";
import { getRandomInt, getRandomArbitrary, jsonRead } from "emberutils";
import { Config, Command } from "../interfaces";

module.exports = {
    name: 'rng',
    aliases: [],
    description: 'random number generator',
    async run(message: Message, args: string[]) {
        const { prefix } = await jsonRead('./config.json') as Config;
        const max = (!isNaN(parseInt(args[1])) ? parseInt(args[1]) : parseInt(args[0]));
        const min = (max === parseInt(args[1]) ? parseInt(args[0]) : undefined);
        if (args.filter(arg => !isNaN(parseInt(arg))).length === 0) await message.channel.send(`you didnt provide any numbers :gun:\nactual usage: \`${prefix}rng (number) <number>\``);
        else if (max === parseInt(args[0])) {
            const result = getRandomInt(max);
            await message.channel.send(`random integer generator: ${result}`);
            return;
        } else if (max === parseInt(args[1])) {
            const result = getRandomArbitrary(min, max);
            await message.channel.send(`random arbitrary generator: ${result}`);
            return;
        }
    }
} as Command;