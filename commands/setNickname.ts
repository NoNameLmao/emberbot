import { Message } from "discord.js";
import { Command } from "./-handler";

module.exports = {
    name: 'setNickname',
    description: 'im definetely not embers slave but i dont change my nick without his command so idk really',
    async run(message: Message, args: string[]) {
        const me = await message.guild.members.fetch(message.client.user.id);
        await me.setNickname(args.join(' ')).catch(async error => {
            await message.channel.send(`❌ Error changing nickname:\n\`\`\`${error}\`\`\``);
        });
        await message.channel.send(`Changed my nickname to \`${args.join(' ')}\``);
    }
} as Command;