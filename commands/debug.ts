import { Message } from "discord.js";
import { jsonRead, jsonWrite } from "emberutils";
import { Config } from "../interfaces";
import { Command } from "../interfaces";

module.exports = {
    name: 'debug',
    description: 'its like your average debugging (console.log\'ging every variable each line) but i put it in discord 💀',
    hideFromHelp: true,
    async run(message: Message, args: string[]) {
        let config = await jsonRead('./config.json') as Config;
        if (args[0] === 'true') {
            if (config.debug) {
                await message.react('❌');
                return;
            }
            config.debug = true;
            await jsonWrite('./config.json', config);
            await message.react('✅');
        } else if (args[0] === 'false') {
            if (!config.debug) {
                await message.react('❌');
                return;
            }
            config.debug = false;
            await jsonWrite('./config.json', config);
            await message.react('✅');
        } else if (!args[0]) {
            if (config.debug) await message.channel.send('debug mode is currently on ✅');
            else if (!config.debug) await message.channel.send('debug mode is currently off ❌');
        }
    }
} as Command;