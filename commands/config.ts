import { Message } from "discord.js";
import { Command } from "./-handler";

module.exports = {
    name: 'config',
    aliases: ['cfg'],
    description: 'see config in fancy highlighting',
    async run(message: Message) {
        await message.channel.send(`\`\`\`json\n${JSON.stringify(require('../config.json'), null, 4)}\`\`\``);
    }
} as Command;