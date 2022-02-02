import { Message, MessageEmbed } from "discord.js";
import { jsonRead, jsonWrite } from "emberutils";
import { Config, TagList, Command } from "../interfaces";

module.exports = {
    name: 'tag',
    description: 'Basically minicommands that you can create and store text in',
    async run(message: Message, args: string[]) {
        const config = await jsonRead('./config.json') as Config;
        const tagList: TagList = await jsonRead('./tags.json');
        if (!args[0]) {
            const tagsEmbed = new MessageEmbed()
            .setTitle('tags (you can also use "tag" instead)')
            .setDescription('Basically minicommands that you can create and store text in')
            .setColor(message.member.displayHexColor)
            .setFields(
                {
                    name: 'global',
                    value: `For global tags use "${config.prefix}tags global" instead`
                },
                {
                    name: 'view (tag name)',
                    value: 'View a tag',
                    inline: true
                },
                {
                    name: 'add (tag name) (text)',
                    value: 'Add your own tag!',
                    inline: true
                },
                {
                    name: 'create (tag name) text',
                    value: 'Same as "add"'
                },
                {
                    name: 'info (tag name)',
                    value: 'See information about a tag',
                    inline: true
                },
                {
                    name: 'list',
                    value: 'List of all your tags (sent in DM to prevent spam in the server)',
                    inline: true
                }
            )
            .setFooter({ text: 'WIP af' });
            await message.channel.send({ embeds: [tagsEmbed] });
        } else if (args[0] === 'view') {
            let tag = tagList.user_specific[message.author.id][args[1]];
            if (!tagList.user_specific[message.author.id]) {
                message.channel.send('❌ You do not have any tags');
                return;
            }
            if (!tag) {
                message.channel.send('❌ That tag does not exist or isn\'t yours');
                return;
            }
            await message.channel.send(tag.text);
            tag.info.used++;
            await jsonWrite('./tags.json', tagList).catch(error => message.channel.send(`❌ ${error}`));
        } else if (['add', 'create'].includes(args[0])) {
            console.log(args[1]);
            console.log(args.slice(2).join(' '));
            console.log(new Date(). getTime());
            console.log(message.author.tag);
            console.log(message.author.id);
            if (typeof tagList.user_specific[message.author.id] === 'undefined') {
                tagList.user_specific[message.author.id] = {};
            }
            tagList.user_specific[message.author.id][args[1]] = {
                text: args.slice(2).join(' '),
                info: {
                    created: {
                        at: new Date().getTime(),
                        by: message.author.tag,
                        byID: message.author.id
                    },
                    used: 0
                }
            }
            await jsonWrite('./tags.json', tagList);
            await message.channel.send('✅ Your tag was saved!');
        } else if (args[0] === 'info') {
            let tag = tagList.user_specific[message.author.id][args[1]];
            if (!tagList.user_specific[message.author.id]) {
                message.channel.send('❌ You do not have any tags');
                return;
            }
            if (!tag) {
                await message.channel.send('❌ That tag does not exist or isn\'t yours');
                return;
            }
            await message.channel.send(
                `Tag name: **${args[1]}**\n\n` +
                `Author: **${tag.info.created.by}**\n` +
                `Creation date: **${new Date(tag.info.created.at).toUTCString()}**\n` +
                `It had been used **${tag.info.used}** time(s)`
            );
        } else if (args[0] === 'list') {
            const userDMs = await message.member.createDM();
            let msg = ``;
            let i = 0;
            if (!tagList.user_specific[message.author.id]) tagList.user_specific[message.author.id] = {};
            for (; i < Object.keys(tagList.user_specific[message.author.id]).length; i++) {
                const name = Object.keys(tagList.user_specific[message.author.id])[i];
                msg += `${name}, `;
            }
            message.react('✅');
            if (msg.length == 0) {
                await userDMs.send(`You don't have any tags!`);
                return;
            }
            await userDMs.send(msg.slice(0, 2)); // remove the last ", ";
            await userDMs.send(`Total amount: **${i}**`);
        } else if (args[0] === 'global') {
            if (!args[1]) {
                const tagsGlobalEmbed = new MessageEmbed()
                .setTitle('tags global')
                .setDescription('A global version of tags - tags that aren\'t exclusive to their authors and usable by everyone')
                .setColor(message.member.displayHexColor)
                .setFields(
                    {
                        name: 'view (tag name)',
                        value: 'View a tag',
                        inline: true
                    },
                    {
                        name: 'add (tag name) (text)',
                        value: 'Add your own tag!',
                        inline: true
                    },
                    {
                        name: 'create (tag name) text',
                        value: 'Same as "add"',
                        inline: true
                    },
                    {
                        name: 'info (tag name)',
                        value: 'See information about a tag',
                        inline: true
                    },
                    {
                        name: 'list',
                        value: 'A list of all global tags (sent in DM to prevent spam in the server)',
                        inline: true
                    }
                );
                await message.channel.send({ embeds: [tagsGlobalEmbed] });
            } else if (args[1] === 'view') {
                let tag = tagList.global[args[2]];
                if (!tag) {
                    await message.channel.send('❌ That tag does not exist.');
                    return;
                }
                await message.channel.send(tag.text);
                tag.info.used++;
                await jsonWrite('./tags.json', tagList).catch(error => message.channel.send(`❌ ${error}`));
            } else if (['add', 'create'].includes(args[1])) {
                tagList.global[args[2]] = {
                    text: args.slice(3).join(' '),
                    info: {
                        created: {
                            at: new Date().getTime(),
                            by: message.author.tag,
                            byID: message.author.id
                        },
                        used: 0
                    }
                }
                await jsonWrite('./tags.json', tagList).catch(error => message.channel.send(`❌ ${error}`));
                message.channel.send('✅ Your tag was saved!');
            } else if (args[1] === 'info') {
                let tag = tagList.global[args[2]];
                if (!tag) {
                    await message.channel.send('❌ That tag does not exist.');
                    return;
                }
                await message.channel.send(
                    `Global tag name: **${args[2]}**\n\n` +
                    `Author: **${tag.info.created.by}**\n` +
                    `Creation date: **${new Date(tag.info.created.at).toUTCString()}**\n` +
                    `It had been used **${tag.info.used}** time(s)`
                );
            } else if (args[1] === 'list') {
                message.react('✅');
                let userDMs = await message.member.createDM();
                let msg = ``;
                let i = 0;
                for (; i < Object.keys(tagList.global).length; i++) {
                    const name = Object.keys(tagList.global)[i];
                    msg += `${name}, `
                }
                await userDMs.send(msg);
                await userDMs.send(`Total amount: **${i}**`);
            }
        }
    }
} as Command;