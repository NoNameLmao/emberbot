import { Message } from "discord.js";
import { Command } from "./-handler";

module.exports = {
    name: 'code',
    aliases: ['run'],
    description: 'regular reminder that embers memory sucks and needs me to remind him certain parts of how im made 💀',
    async run(message: Message, args: string[]) {
        if (args[0] === 'args') {
            await message.channel.send(
                'u forgot again? bruh\n`.(command) (args[0]) (args[1])...` etc\nget good lol\nalso uh if you want to category `.(category => command) (command => args[0])`',
            ); return;
        } else if (args[0] === 'rae' || args[0] === 'randomarrayelement') {
            await message.channel.send(
                'how many times do i have to remind u with this shit?\n```js\narray[Math.floor(Math.random() * array.length)];```',
            ); return;
        } else message.channel.send('what now? random array element or args 🤣🤣🤣');
    }
} as Command;