import { Message, MessageEmbed } from "discord.js";
import { jsonRead } from "emberutils";
import { Config } from "../interfaces";
import { Command } from "./-handler";

module.exports = {
    name: 'convert',
    description: 'Categorised commands for conversion. Run this command for more information.',
    async run(message: Message, args: string[]) {
        const config = await jsonRead('./config.json') as Config;
        if (!args[0]) {
            const convertEmbed = new MessageEmbed()
            .setTitle('Command category: Convert')
            .setDescription(`Usage: ${config.prefix}convert (command)\n<> = Optional argument(s)`)
            .setColor(message.member.displayHexColor)
            .addField('text2bf', 'Convert text to brainfuck')
            .setFooter({ text: 'Commands for converting stuff to other stuff'});
            await message.channel.send({ embeds: [convertEmbed] });
        } else if (args[0] === 'text2bf') {
            if (!args[1]) {
                await message.channel.send(`❌ you didnt provide any text\nusage: ${config.prefix}convert text2bf (text)`);
                return;
            } else {
                const { text2bf } = await import('../stuff/text2bf'),
                    text = args.slice(1).join(' '),
                    bf = text2bf(text),
                    text2bfEmbed = new MessageEmbed()
                    .setTitle('convert text2bf')
                    .setDescription('Converted text to brainfuck')
                    .setColor(message.member.displayHexColor)
                    .setFields(
                        {
                            name: 'Original text',
                            value: text
                        },
                        {
                            name: 'Brainfuck',
                            value: bf
                        }
                    )
                ;
                await message.channel.send({ embeds: [text2bfEmbed] });
            }
        }
    }
} as Command;