import { Message } from "discord.js";
import { Command } from "../interfaces";

module.exports = {
    name: 'config',
    aliases: ['cfg'],
    description: 'see config in fancy highlighting',
    hideFromHelp: true,
    async run(message: Message) {
        await message.channel.send(`\`\`\`json\n${JSON.stringify(require('../config.json'), null, 4)}\`\`\``);
    }
} as Command;