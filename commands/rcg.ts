import { Message } from "discord.js";
import { jsonRead } from "emberutils";
import { MiscJSON } from "../interfaces";
import { Command } from "./-handler";

module.exports = {
    name: 'rcg',
    aliases: [],
    description: 'random country generator, dont kill me',
    async run(message: Message) {
        const { countryList } = await jsonRead('./misc.json') as MiscJSON;
        await message.channel.send(`Random country generator: \`${countryList[Math.floor(Math.random() * countryList.length)]}\``);
    }
} as Command;