import { Message } from "discord.js";
import { Command } from "../interfaces";

module.exports = {
    name: 'dn',
    description: 'whats dn?',
    hideFromHelp: true,
    run(message: Message) {
        message.channel.send('deez nuts');
    }
} as Command;