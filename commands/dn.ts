import { Message } from "discord.js";
import { Command } from "./-handler";

module.exports = {
    name: 'dn',
    description: 'whats dn?',
    hideFromHelp: true,
    run(message: Message) {
        message.channel.send('deez nuts');
    }
} as Command;