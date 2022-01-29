import { Message } from "discord.js";
import { Command } from "./-handler";

module.exports = {
    name: 'ping',
    description: 'Get discord latency (compares current time to the time when the command was sent)',
    async run(message: Message) {
        message.channel.send(
            `Message-measured ping: ${Date.now() - message.createdTimestamp}ms
            WebSocket ping: ${message.client.ws.ping}ms`
        )
    }
} as Command;