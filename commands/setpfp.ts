import { Message } from "discord.js";
import { Command } from "./-handler";

module.exports = {
    name: 'setpfp',
    aliases: [],
    description: 'only ember can do this dont even try',
    async run(message: Message, args: string[]) {
        const emberID = '341123308844220447';
        if (message.author.id === emberID) {
            await message.channel.send('alright king');
            let url: string;
            if (message.attachments?.first()?.url?.length > 0) url = message.attachments?.first()?.url;
            else url = args[0];
            await message.client.user.setAvatar(url);
            await message.channel.send('done, how do i look? (refresh discord or make me send another message)');
        } else await message.channel.send('❌ get real');
    }
} as Command;