import { Message } from "discord.js";
import { Command } from "./-handler";

module.exports = {
    name: 'config',
    description: 'see config in fancy highlighting',
    async run(message: Message, args: string[]) {
        await message.channel.send(`\`\`\`json\n${JSON.stringify(require('../config.json'), null, 4)}\`\`\``);
    }
} as Command;