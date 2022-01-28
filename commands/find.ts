import { Message } from "discord.js";
import { Command } from "./-handler";

module.exports = {
    name: 'find',
    description: 'find something in channel',
    async run(message: Message, args: string[]) {
        const messages = (await message.channel.messages.fetch()).filter(msg => msg.content.includes(args.join()) && msg !== message);
        await message.channel.send(
            `Got **${messages.size}** exact results in this channel\n` +
            `Last one: https://discord.com/channels/${message.guild.id}/${message.channel.id}/${messages.last().id}\n`
        )
    }
} as Command;