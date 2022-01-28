import { Message } from "discord.js";
import { Command } from "./-handler";

module.exports = {
    name: 'suggest',
    aliases: [],
    description: 'send an idea on how to improve the bot (or a bug to fix)',
    async run(message: Message, args: string[]) {
        const suggestion = args.join(' ');
        const emberID = '341123308844220447';
        const ember = await message.client.users.fetch(emberID);
        ember.send(`Bot suggestion by ${message.author.tag}:\n\`${suggestion}\`\nSent at ${message.createdAt} in <#${message.channel.id}>`);
        await message.channel.send('Your suggestion has been sent! thanks');
    }
} as Command