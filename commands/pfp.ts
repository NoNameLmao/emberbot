import { Message, User } from "discord.js";
import { Command } from "../interfaces";

module.exports = {
    name: 'pfp',
    aliases: [],
    description: 'doesnt every discord bot on the planet have this feature? 🤣',
    async run(message: Message, args: string[]) {
        try {
            let user: User;
            let pfp: string;
            if (args[0]) {
                if (message.mentions.users.size > 0) {
                    user = message.mentions.users.first();
                    pfp = user?.displayAvatarURL({ dynamic: true, format: 'png' });
                    await message.channel.send(`oh man you could've just sent me their id why did you ping that poor person just for his avatar yikes\n${pfp}`);
                } else {
                    user = await message.client.users.fetch(args[0]);
                    pfp = user.avatarURL({ dynamic: true, format: 'png' });
                    await message.channel.send(`there you go\n${pfp}`);
                }
            } else {
                user = message.author;
                pfp = user.avatarURL({ dynamic: true, format: 'png' });
                await message.channel.send(`you wanna look at your own pfp? fine ig\n${pfp}`);
            }
        } catch (error) {
            message.react('❌');
            await message.channel.send(`epic bruh moment (command error)\n\`${error}\``);
        }
    }
} as Command;