import { Message, MessageEmbed } from "discord.js";
import { jsonRead } from "emberutils";
import { readdir } from "fs/promises";
import { Config, Command } from "../interfaces";
import { importCommand } from "./-handler";

module.exports = {
    name: 'help',
    aliases: ['?'],
    description: 'unless ur seeing this on github then you just ran this command and you know what it does',
    hideFromHelp: false,
    async run(message: Message) {
        const commands: Command[] = [];
        const { prefix } = await jsonRead('./config.json') as Config;
        const files = await readdir('./commands/');
        for await (let file of files) {
            const command = await importCommand(file);
            if (command.aliases === undefined) command.aliases = [];
            commands.push(command);
        }
        let helpEmbed = new MessageEmbed()
        .setTitle('All list of commands')
        .setDescription(`prefix: ${prefix}\n<> = optional argument`)
        .setColor(message.member.displayHexColor)
        .setFooter({ text: 'sus' });
        for (const command of commands) {
            if (command.name == undefined || command.hideFromHelp) continue;
            if (command.aliases.length > 0) helpEmbed = helpEmbed.addField(`${command.name} [${command.aliases.join(', ')}]`, command.description || 'N/A', true);
            else helpEmbed = helpEmbed.addField(`${command.name}`, command.description || 'N/A', true);
        };
        message.channel.send({ embeds: [helpEmbed] });
    }
} as Command;