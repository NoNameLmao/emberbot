import { Message } from "discord.js";
import { Command } from "./-handler";

module.exports = {
    name: 'dn',
    aliases: [],
    description: 'whats dn?',
    run(message: Message) {
        message.channel.send('deez nuts');
    }
} as Command;