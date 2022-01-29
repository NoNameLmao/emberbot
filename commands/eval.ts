import { Message, MessageEmbed } from "discord.js";
import { getRandomInt, jsonRead, limit } from "emberutils";
import { MiscJSON } from "../interfaces";
import { Command } from "./-handler";

module.exports = {
    name: 'eval',
    aliases: ['run'],
    description: 'make ember debugging code easier ig? (run js code)',
    async run(message: Message, args: string[]) {
        const code = args.join(' ');
        let evalEmbed = new MessageEmbed()
        .setTitle('eval result')
        .addField('Input', `\`\`\`js\n${code}\`\`\``);
        const emberID = '341123308844220447';
        const { technobladeQuotes } = await jsonRead('./misc.json') as MiscJSON;
        function randomTechnoQuote(): string {
            return technobladeQuotes[getRandomInt(technobladeQuotes.length + 1)];
        }
        if (message.author.id === emberID) {
            try {
                const result = eval(code);
                let output = result;
                if (typeof output !== 'string') output = require('util').inspect(result);
                evalEmbed = evalEmbed
                .setColor(message.member.displayHexColor)
                .addField('✅ Output', `\`\`\`js\n${limit(output, 503)}\`\`\``);
                await message.channel.send({ embeds: [evalEmbed] });
            } catch (error) {
                evalEmbed = evalEmbed
                .setColor('RED')
                .addField('❌ Error output', limit(`\`\`\`js\n${error}\`\`\``, 512));
                await message.channel.send({ embeds: [evalEmbed] });
            }
        } else {
            evalEmbed = evalEmbed
            .setColor('RED')
            .addField('Technoblade never dies', `${randomTechnoQuote()}`)
            .setFooter({ text: '❌ No permission' });
            await message.channel.send({ embeds: [evalEmbed] });
        }
    }
} as Command;